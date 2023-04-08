const { checkoutProductsService } = require('./CheckoutServices')
const { validateCheckoutBody } = require('../../../validator/checkouts')

exports.checkoutProducts = async (req, res) => {
  const userId = req.user.id
  validateCheckoutBody(req.body)
  const { productLists } = req.body // productList dalam bentuk array of product id
  const invoice_url = await checkoutProductsService(productLists, userId)
  res.json({
    status: 'success',
    message: 'Checkout success',
    invoice_url
  })
}
