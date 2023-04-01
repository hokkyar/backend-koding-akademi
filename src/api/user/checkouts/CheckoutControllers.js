const { checkoutByProductIdService } = require('./CheckoutServices')

exports.checkoutByProductId = async (req, res) => {
  const product_id = req.params.id
  const user_id = req.user.id
  await checkoutByProductIdService(product_id, user_id)
  res.json({
    message: 'Payment success'
  })
}