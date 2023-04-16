const router = require('express').Router()

const params = {
  page: 'contact',
  title: 'Contact',
  sub: 'Contact',
  detail: '',
  data: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
