const router = require('express').Router()

const params = {
  page: 'dashboard',
  title: 'Dashboard',
  sub: '',
  detail: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
