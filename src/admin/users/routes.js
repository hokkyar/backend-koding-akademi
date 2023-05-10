const router = require('express').Router()
const { User, Student, UserProduct, Product, sequelize } = require('../../models/index')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

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

  res.render('index', { ...params, data: users })
})

// get detail user
router.get('/show/:id', async (req, res) => {
  let user = await User.findOne({
    where: { id: req.params.id, role: 'user' }
  })
  if (!user) res.render('index', { ...params, sub_page: 'not-found' })

  // let user_products = await UserProduct.findAll({
  //   include: [
  //     {
  //       model: Product
  //     }
  //   ],
  //   where: { user_id: req.params.id }
  // })

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

  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: { user, user_products } })
})

// create user service
router.post('/', async (req, res) => {
  const { full_name, email, password } = req.body
  const phone_number = (req.body.phone_number === '') ? null : req.body.phone_number
  const address = (req.body.address === '') ? null : req.body.address
  const birth_date = (req.body.birth_date === '') ? null : req.body.birth_date
  const verified = (!req.body.verified) ? false : true

  try {
    await sequelize.transaction(async (t) => {
      const id = 'user-' + nanoid(16)
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ id, full_name, email, password: hashedPassword, verified, role: 'user', qr_code: null }, { transaction: t })
      await Student.create({ user_id: id, phone_number, address, birth_date }, { transaction: t })
    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }
  res.sendStatus(201)
})

// edit user service
router.put('/edit/:id', async (req, res) => {
  const verified = req.body.verified ? true : false
  const { full_name, email, phone_number, address, birth_date } = req.body
  try {
    await sequelize.transaction(async (t) => {
      await User.update({ full_name, email, verified }, { where: { id: req.params.id }, transaction: t })
      await Student.update({ phone_number, address, birth_date }, { where: { user_id: req.params.id }, transaction: t })
    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }
  res.sendStatus(200)
})

// delete user service
router.delete('/delete/:id', async (req, res) => {
  await User.destroy({
    where: { id: req.params.id }
  })
  res.sendStatus(200)
})

module.exports = router
