const { getCartItemsService, postCartItemService, deleteCartItemService } = require('./CartServices')
const { validateCartBody, validateDeleteCartBody } = require('../../../validator/cart')

exports.getCartItems = async (req, res) => {
  const userId = req.user.id
  const { cartId, cart_items } = await getCartItemsService(userId)
  res.json({
    status: 'success',
    message: 'Get cart items',
    data: {
      cart_id: cartId,
      cart_items
    }
  })
}

exports.postCartItem = async (req, res) => {
  const userId = req.user.id
  validateCartBody(req.body)
  const { productId, selectedDate = null } = req.body
  await postCartItemService(userId, productId, selectedDate)
  res.status(201).json({
    status: 'success',
    message: 'Add cart item success'
  })
}

exports.deleteCartItem = async (req, res) => {
  const userId = req.user.id
  validateDeleteCartBody(req.body)
  const { productLists } = req.body // productLists berupa array of productId
  await deleteCartItemService(userId, productLists)
  res.json({
    status: 'success',
    message: 'Delete cart item success'
  })
}
