const router = require('express').Router()

const params = {
  page: 'dashboard'
}

router.get('/dashboard', (req, res) => res.render('index', params))

module.exports = router
