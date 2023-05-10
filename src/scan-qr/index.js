const router = require('express').Router()
const { UserProduct, Product, User } = require('../models/index')

router.get('/', (req, res) => {
  return res.render('qr-scan-public/page')
})

router.get('/:id', async (req, res) => {
  try {
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
        user_id: req.params.id,
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
    return res.status(400).json({
      message: 'Bad payload'
    })
  }
})

module.exports = router