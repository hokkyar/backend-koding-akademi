const router = require('express').Router()

const params = {
  page: 'courses',
  title: 'Courses',
  sub: 'Manage',
  detail: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
