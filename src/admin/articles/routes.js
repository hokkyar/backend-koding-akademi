const router = require('express').Router()

router.get('/articles', (req, res) => {
  res.render('pages/articles/page')
})

module.exports = router
