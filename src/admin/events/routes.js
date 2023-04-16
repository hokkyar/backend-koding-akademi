const router = require('express').Router()

const params = {
  page: 'events',
  title: 'Events',
  sub: 'Manage',
  detail: ''
}

router.get('/events', (req, res) => {
  res.render('index', params)
})

module.exports = router
