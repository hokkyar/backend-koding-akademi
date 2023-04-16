const router = require('express').Router()

router.get('/qr-code', (req, res) => {
  res.render('pages/qr-code/page')
})

module.exports = router
