const { getCartService, postCartService, deleteCartService } = require('./CartServices')

exports.getCart = async (req, res) => {
  const userId = req.user.id
  const cart_item = await getCartService(userId)
  res.json({
    status: 'success',
    message: 'Get cart',
    data: cart_item
  })
}

exports.postCart = async (req, res) => {
  const userId = req.user.id
  const { productId } = req.body
  await postCartService(userId, productId)
  res.json({
    status: 'success',
    // message: 'Add cart item success',
  })
}

exports.deleteCart = async (req, res) => {
  const { cartId, productId } = req.body
  await deleteCartService(cartId, productId)
  res.json({
    status: 'success',
    // message: 'Delete cart item success'
  })
}