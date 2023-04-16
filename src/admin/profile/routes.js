const router = require('express').Router()

const params = {
  page: 'profile',
  title: 'Profile',
  sub: 'Profile',
  detail: '',
  data: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
