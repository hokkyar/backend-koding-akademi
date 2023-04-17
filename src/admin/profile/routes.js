const router = require('express').Router()

const params = {
  page: 'profile',
  sub_page: 'page',
  title: 'Profile',
  sub: 'Profile',
  detail: '',
  data: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
