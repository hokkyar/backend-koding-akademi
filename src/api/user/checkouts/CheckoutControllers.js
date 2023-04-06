const { checkoutProductsService } = require('./CheckoutServices')

exports.checkoutProducts = async (req, res) => {
  const userId = req.user.id
  const { productLists } = req.body // productList dalam bentuk array of product id
  await checkoutProductsService(productLists, userId)
  res.json({
    status: 'success',
    message: 'Checkout success'
  })
}
