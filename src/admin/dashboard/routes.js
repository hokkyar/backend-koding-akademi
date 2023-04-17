const router = require('express').Router()

const params = {
  page: 'dashboard',
  sub_page: 'page',
  title: 'Dashboard',
  sub: '',
  detail: '',
  data: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
