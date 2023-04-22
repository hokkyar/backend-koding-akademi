const router = require('express').Router()
const { User, UserProduct, Product } = require('../../models/index')
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
  const users = await User.findAll()
  res.render('index', { ...params, data: users })
})

// get detail user
router.get('/show/:id', async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id }
  })
  if (!user) res.render('index', { ...params, sub_page: 'not-found' })

  const user_products = await UserProduct.findAll({
    include: [
      {
        model: Product
      }
    ],
    where: { user_id: req.params.id }
  })

  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: { user, user_products } })
})

// create user service
router.post('/', async (req, res) => {
  const { full_name, email, password } = req.body
  const phone_number = (req.body.phone_number === '') ? null : req.body.phone_number
  const verified = (!req.body.verified) ? false : true

  const id = 'user-' + nanoid(16)
  const hashedPassword = await bcrypt.hash(password, 10)
  await User.create({ id, full_name, email, password: hashedPassword, phone_number, verified })
  res.json({ message: 'success' })
})

// edit user service
router.put('/edit/:id', async (req, res) => {
  const verified = req.body.verified ? true : false
  await User.update({ full_name: req.body.full_name, verified }, { where: { id: req.params.id } })
  res.json({ message: 'success' })
})

// delete user service
router.delete('/delete/:id', async (req, res) => {
  await User.destroy({
    where: { id: req.params.id }
  })
  res.json({ message: 'success' })
})

module.exports = router
