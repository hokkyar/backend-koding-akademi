const router = require('express').Router()

const params = {
  page: 'articles'
}

router.get('/articles', (req, res) => {
  res.render('index', params)
})

module.exports = router
