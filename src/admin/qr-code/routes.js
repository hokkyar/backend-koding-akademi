const router = require('express').Router()

const params = {
  page: 'qr-code',
  title: 'Scan QR Code',
  sub: 'QR',
  detail: '',
  data: ''
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router
