const router = require('express').Router()

router.get('/coupons', (req, res) => {
  res.render('pages/coupons/page')
})

module.exports = router
