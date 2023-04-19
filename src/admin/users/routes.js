const router = require('express').Router()
const { User } = require('../../models/index')

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
  const data = await User.findAll()
  res.render('index', { ...params, data })
})

// get detail user
router.get('/show/:id', async (req, res) => {
  const data = await User.findOne({
    where: { id: req.params.id }
  })
  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data })
})

// create user
router.post('/', async (req, res) => {
  console.log(req.body)
  res.send('ok')
  // await User.create(req.body)
})

module.exports = router
