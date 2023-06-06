const { checkoutProductsService } = require('./CheckoutServices')
const { validateCheckoutBody } = require('../../../validator/checkouts')

exports.checkoutProducts = async (req, res) => {
  validateCheckoutBody(req.body)
  const userId = req.user.id
  const { productList, custom_field_1 = null, custom_field_2 = null, custom_field_3 = null } = req.body
  const couponId = req.query.couponId ? req.query.couponId : null
  const response = await checkoutProductsService(productList, userId, couponId, custom_field_1, custom_field_2, custom_field_3)

  if (response.invoice_url) {
    return res.status(201).json({
      status: 'success',
      message: 'Checkout success',
      invoice_url: response.invoice_url
    })
  }

  return res.status(201).json({
    status: 'success',
    message: response
  })
}
