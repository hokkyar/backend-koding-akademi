const router = require('express').Router()

const params = {
  page: 'qr-code'
}

router.get('/qr-code', (req, res) => {
  res.render('index', params)
})

module.exports = router
