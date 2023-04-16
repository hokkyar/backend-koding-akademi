const router = require('express').Router()

const params = {
  page: 'contact'
}

router.get('/contact', (req, res) => res.render('index', params))

module.exports = router
