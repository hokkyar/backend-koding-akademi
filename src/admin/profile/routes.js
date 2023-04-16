const router = require('express').Router()

const params = {
  page: 'profile',
  title: 'Profile',
  sub: 'Profile',
  detail: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
