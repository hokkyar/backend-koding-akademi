const router = require('express').Router()

const params = {
  page: 'coupons',
  title: 'Coupons',
  sub: 'Manage',
  detail: '',
  data: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
