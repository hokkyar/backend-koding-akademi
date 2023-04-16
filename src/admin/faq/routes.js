const router = require('express').Router()

const params = {
  page: 'faq'
}

router.get('/faq', (req, res) => res.render('index', params))

module.exports = router
