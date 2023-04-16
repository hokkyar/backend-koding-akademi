const router = require('express').Router()

const params = {
  page: 'coupons'
}

router.get('/coupons', (req, res) => {
  res.render('index', params)
})

module.exports = router
