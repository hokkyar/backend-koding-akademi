const router = require('express').Router()

const params = {
  page: 'profile'
}

router.get('/profile', (req, res) => res.render('index', params))

module.exports = router
