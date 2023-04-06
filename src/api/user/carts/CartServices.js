const { Cart, CartItem, Product, Order, OrderItem } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const ConflictError = require('../../../exceptions/ConflictError')

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
  // cek apakah cart tersedia
  const cart = await Cart.findOne({
    where: {
      user_id: userId
    }
  })
  if (!cart) throw new NotFoundError('Cart not found')

  // ambil cartId nya
  const cartId = cart.dataValues.id

  // cek apakah product tersebut ada
  const product = await Product.findOne({
    where: {
      id: productId
    }
  })
  if (!product) throw new NotFoundError('Product not found')

  // lihat semua order yang dimiliki oleh user
  const user_orders = await Order.findAll({
    where: { user_id: userId }
  })

  const orderLength = user_orders.length
  if (orderLength) {
    for (let i = 0; i < orderLength; i++) {
      const orderId = user_orders[i].dataValues.id
      // apakah product yang user akan masukkan ke keranjang sudah diorder
      const orderItem = await OrderItem.findOne({
        where: { order_id: orderId, product_id: productId }
      })
      if (orderItem) throw new ConflictError('Product already ordered')
    }
  }

  // cek apakah ada product yang double di cart usernya
  const cartItem = await CartItem.findOne({
    where: { cart_id: cartId, product_id: productId }
  })
  if (cartItem) throw new ConflictError('Product already added in your cart')

  // tambahkan cart item ke db
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
