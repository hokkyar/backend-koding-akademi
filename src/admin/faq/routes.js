const router = require('express').Router()

const params = {
  page: 'faq',
  sub_page: 'page',
  title: 'FAQ',
  sub: 'FAQ',
  detail: '',
  data: ''
}

router.get('/', (req, res) => res.render('index', params))

module.exports = router
