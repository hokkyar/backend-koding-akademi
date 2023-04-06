const { Cart, CartItem, Product } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getCartService = async (userId) => {
  const cart = await Cart.findOne({
    where: {
      user_id: userId
    }
  })
  if (!cart) throw new NotFoundError('Cart not found')

  const cartId = cart.dataValues.id
  const cart_item = await CartItem.findAll({
    include: [
      {
        model: Product,
        attributes: ['name', 'price', 'discount_price', 'img_url']
      }
    ],
    where: { cart_id: cartId }
  })
  return cart_item
}

exports.postCartService = async (userId, productId) => {
  const cart = await Cart.findOne({
    where: {
      user_id: userId
    }
  })
  if (!cart) throw new NotFoundError('Cart not found')

  const product = await Product.findOne({
    where: {
      id: productId
    }
  })
  if (!product) throw new NotFoundError('Product not found')

  const cartId = cart.dataValues.id
  await CartItem.create({ cart_id: cartId, product_id: productId })
}

exports.deleteCartService = async (cartId, productId) => {
  const cart_item = await CartItem.findOne({
    where: {
      cart_id: cartId,
      product_id: productId
    }
  })
  if (!cart_item) throw new NotFoundError('Cart item not found')

  await CartItem.destroy({
    where: {
      cart_id: cartId,
      product_id: productId
    }
  })
}
