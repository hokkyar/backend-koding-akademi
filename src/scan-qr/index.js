const router = require('express').Router()
const { decryptData } = require('../utils/encryptData')
const { UserProduct, Product, User } = require('../models/index')

router.get('/', (req, res) => {
  return res.render('qr-scan-public/page')
})

router.get('/:qr', async (req, res) => {
  try {
    const qr_decrypted = decryptData(req.params.qr)
    const id = new URLSearchParams(qr_decrypted).get('id')
    const user = await User.findOne({
      where: { id }
    })
    if (user.qr_code != req.params.qr) throw 'Invalid QR Code'

    const user_products = await UserProduct.findAll({
      include: [
        {
          model: User
        },
        {
          model: Product
        },
      ],
      where: {
        user_id: id,
        status: 'active'
      }
    })

    const product_active = user_products.map((item) => ({
      product_name: item.Product.name,
      img_url: item.Product.img_url,
      expired_date: item.expired_date,
    }))

    return res.json({
      message: 'success',
      data: {
        id: user_products[0].user_id,
        name: user_products[0].User.full_name,
        email: user_products[0].User.email,
        product_active
      }
    })

  } catch (err) {
    return res.status(404).json({
      message: err
    })
  }
})

module.exports = router
