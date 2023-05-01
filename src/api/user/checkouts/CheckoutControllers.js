const { checkoutProductsService } = require('./CheckoutServices')
const { validateCheckoutBody } = require('../../../validator/checkouts')

exports.checkoutProducts = async (req, res) => {
  const userId = req.user.id
  validateCheckoutBody(req.body)
  const { productLists } = req.body // productList dalam bentuk array of product id
  const response = await checkoutProductsService(productLists, userId)

  if (response.invoice_url) {
    res.status(201).json({
      status: 'success',
      message: 'Checkout success',
      invoice_url: response.invoice_url
    })
  }

  res.status(201).json({
    status: 'success',
    message: response
  })
}
