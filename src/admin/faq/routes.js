const router = require('express').Router()

const params = {
  page: 'faq',
  title: 'FAQ',
  sub: 'FAQ',
  detail: '',
  data: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
