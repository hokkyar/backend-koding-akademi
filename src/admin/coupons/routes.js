const router = require('express').Router()

const params = {
  page: 'coupons',
  title: 'Coupons',
  sub: 'Manage',
  detail: ''
}

router.get('/coupons', (req, res) => {
  res.render('index', params)
})

module.exports = router
