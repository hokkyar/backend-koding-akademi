const router = require('express').Router()

const params = {
  page: 'courses',
  title: 'Courses',
  sub: 'Manage',
  detail: ''
}

router.get('/courses', (req, res) => {
  res.render('index', params)
})

module.exports = router
