const router = require('express').Router()
const { decryptData } = require('../../utils/encryptData')
const { User } = require('../../models/index')

const params = {
  page: 'qr-code',
  sub_page: 'page',
  title: 'Scan QR Code',
  sub: 'QR',
  detail: '',
  data: ''
}

router.get('/', (req, res) => {
  return res.render('index', params)
})

router.get('/:qr', async (req, res) => {
  try {
    const qr_decrypted = decryptData(req.params.qr)
    const id = new URLSearchParams(qr_decrypted).get('id')
    const user = await User.findOne({
      where: { id }
    })
    if (user.qr_code != req.params.qr) throw 'Invalid QR Code'
    return res.json({ id })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

module.exports = router
