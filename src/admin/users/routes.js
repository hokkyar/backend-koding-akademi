const router = require('express').Router()

const params = {
  page: 'users',
  title: 'Users',
  sub: 'Manage',
  detail: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
