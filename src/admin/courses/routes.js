const router = require('express').Router()

router.get('/courses', (req, res) => {
  res.render('pages/courses/page')
})

module.exports = router
