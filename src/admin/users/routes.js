const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { User, Student, Cart, UserProduct, Product, Meeting, sequelize } = require('../../models/index')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const { encryptData } = require('../../utils/encryptData')
const ConflictError = require('../../exceptions/ConflictError')

const params = {
  page: 'users',
  sub_page: 'page',
  title: 'Users',
  sub: 'Manage',
  detail: null,
  data: null
}

// get all users
router.get('/', async (req, res) => {
  const students = await Student.findAll({
    attributes: ['phone_number', 'address', 'birth_date'],
    include: [
      {
        model: User,
        attributes: ['id', 'email', 'full_name', 'qr_code', 'verified'],
        where: { role: 'user' }
      }
    ]
  })

  const users = students.map(student => ({
    id: student.User.id,
    email: student.User.email,
    full_name: student.User.full_name,
    qr_code: student.User.qr_code,
    verified: student.User.verified,
    phone_number: student.phone_number,
    address: student.address,
    birth_date: student.birth_date
  }))

  return res.render('index', { ...params, data: users })
})

// get detail user
router.get('/show/:id', async (req, res) => {
  let user = await User.findOne({
    where: { id: req.params.id, role: 'user' }
  })
  if (!user) return res.render('index', { ...params, sub_page: 'not-found' })

  const activeProduct = await UserProduct.findAll({
    include: [
      {
        model: Product
      }
    ],
    where: { user_id: req.params.id, status: 'active' }
  })

  const finishedProduct = await UserProduct.findAll({
    include: [
      {
        model: Product
      }
    ],
    where: { user_id: req.params.id, status: 'finished' }
  })

  const student = await Student.findOne({ where: { user_id: user.id } })
  user = { ...user.toJSON(), phone_number: student.phone_number, address: student.address, birth_date: student.birth_date }

  const user_products = { active: activeProduct, finished: finishedProduct }

  return res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: { user, user_products } })
})

// create user service
router.post('/', asyncHandler(async (req, res) => {
  const { full_name, email, password } = req.body

  const isExistingUser = await User.findOne({ where: { email } })
  if (isExistingUser) throw new ConflictError('Email already registered')

  const phone_number = (req.body.phone_number === '') ? null : req.body.phone_number
  const address = (req.body.address === '') ? null : req.body.address
  const birth_date = (req.body.birth_date === '') ? null : req.body.birth_date
  const verified = (!req.body.verified) ? false : true

  try {
    await sequelize.transaction(async (t) => {
      const id = 'user-' + nanoid(16)
      const cartId = `cart-${nanoid(16)}`
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ id, qr_code: encryptData(`id=${id}&tr=null`), full_name, email, password: hashedPassword, verified, role: 'user', qr_code: null }, { transaction: t })
      await Cart.create({ id: cartId, user_id: id }, { transaction: t })
      await Student.create({ user_id: id, phone_number, address, birth_date }, { transaction: t })
    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }
  res.sendStatus(201)
}))

// edit user service
router.put('/edit/:id', asyncHandler(async (req, res) => {
  const verified = req.body.verified ? true : false
  const { full_name, email, phone_number, address, birth_date } = req.body

  const user = await User.findOne({ where: { id: req.params.id } })
  if (user.email !== email) {
    const isExistingUser = await User.findOne({ where: { email } })
    if (isExistingUser) throw new ConflictError('Email already registered')
  }

  try {
    await sequelize.transaction(async (t) => {
      await User.update({ full_name, email, verified }, { where: { id: req.params.id }, transaction: t })
      await Student.update({ phone_number, address, birth_date }, { where: { user_id: req.params.id }, transaction: t })
    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }
  res.sendStatus(200)
}))

// delete user service
router.delete('/delete/:id', async (req, res) => {
  await User.destroy({
    where: { id: req.params.id }
  })
  res.sendStatus(200)
})

router.put('/meetings/:userId/:productId', asyncHandler(async (req, res) => {
  const exist = await UserProduct.findOne({
    where: { user_id: req.params.userId, product_id: req.params.productId }
  })
  if (!exist) return res.render('index', { ...params, sub_page: 'not-found' })

  await UserProduct.decrement('meeting_quota', { where: { user_id: req.params.userId, product_id: req.params.productId } })
  const userProduct = await UserProduct.findOne({
    where: { user_id: req.params.userId, product_id: req.params.productId }
  })
  if (userProduct.meeting_quota <= 0) {
    await UserProduct.update({ status: 'finished' }, { where: { user_id: req.params.userId, product_id: req.params.productId } })
  }

  await Meeting.create({ user_id: req.params.userId, product_id: req.params.productId })
  res.sendStatus(200)
}))

module.exports = router
