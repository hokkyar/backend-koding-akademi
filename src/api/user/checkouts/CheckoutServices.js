const { Order, OrderItem, Product, Cart, CartItem } = require('../../../models/index')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')
const InvariantError = require('../../../exceptions/InvariantError')

// order_status = active, finished, pending, canceled

exports.checkoutProductsService = async (productLists, userId) => {
  // cek dulu cartnya
  const cart = await Cart.findOne({
    where: { user_id: userId }
  })
  if (!cart) throw new NotFoundError('Cart not found')

  // ambil id cartnya
  const cartId = cart.dataValues.id

  // cek cartnya kosong
  const cartItems = await CartItem.findOne({
    where: { cart_id: cartId }
  })
  if (!cartItems) throw new InvariantError('Cart empty')

  for (let i = 0; i < productLists.length; i++) {
    // cek apakah product tersebut ada
    const product = await Product.findOne({
      where: { id: productLists[i] }
    })
    if (!product) throw new NotFoundError('Product not found')

    // cek apakah yang di checkout itu ada di cart usernya
    const item = await CartItem.findOne({
      where: { cart_id: cartId, product_id: productLists[i] }
    })
    if (!item) throw new InvariantError('Product is not available in your cart')
  }

  // buat ordernya
  const orderId = `order-${nanoid(16)}`
  await Order.create({
    id: orderId, user_id: userId, order_status: 'pending'
  })

  // tambahkan setiap product ke order_item
  for (let i = 0; i < productLists.length; i++) {
    const orderItemId = `orderitem-${nanoid(16)}`
    OrderItem.create({
      id: orderItemId, order_id: orderId, product_id: productLists[i]
    })
  }

  // hapus cart itemnya
  for (let i = 0; i < productLists.length; i++) {
    await CartItem.destroy({
      where: { cart_id: cartId, product_id: productLists[i] }
    })
  }

}
