const router = require('express').Router()

const params = {
  page: 'articles',
  title: 'Articles',
  sub: 'Manage',
  detail: ''
}

router.get('/articles', (req, res) => {
  res.render('index', params)
})

module.exports = router
