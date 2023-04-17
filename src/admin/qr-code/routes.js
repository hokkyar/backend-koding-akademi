const router = require('express').Router()

const params = {
  page: 'qr-code',
  sub_page: 'page',
  title: 'Scan QR Code',
  sub: 'QR',
  detail: '',
  data: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
