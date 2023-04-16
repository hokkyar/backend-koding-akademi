const router = require('express').Router()

const params = {
  page: 'events',
  title: 'Events',
  sub: 'Manage',
  detail: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
