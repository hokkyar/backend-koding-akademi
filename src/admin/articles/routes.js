const router = require('express').Router()

const params = {
  page: 'articles',
  title: 'Articles',
  sub: 'Manage',
  detail: '',
  data: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
