const router = require('express').Router()

const params = {
  page: 'contact',
  title: 'Contact',
  sub: 'Contact',
  detail: ''
}

router.get('/contact', (req, res) => res.render('index', params))

module.exports = router
