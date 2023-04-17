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

router.get('/', async (req, res) => {
  const data = await User.findAll()
  res.render('index', { ...params, data })
})

router.get('/show/:id', async (req, res) => {
  const data = await User.findOne({
    where: { id: req.params.id }
  })
  res.render('index', { ...params, sub_page: 'show', data })
})

module.exports = router
