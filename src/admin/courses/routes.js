const router = require('express').Router()

const params = {
  page: 'courses'
}

router.get('/courses', (req, res) => {
  res.render('index', params)
})

module.exports = router
