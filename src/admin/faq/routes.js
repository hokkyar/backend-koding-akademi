const router = require('express').Router()

const params = {
  page: 'faq',
  title: 'FAQ',
  sub: 'FAQ',
  detail: ''
}

router.get('/faq', (req, res) => res.render('index', params))

module.exports = router
