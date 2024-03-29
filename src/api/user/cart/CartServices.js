const { Cart, CartItem, Product, Order, OrderItem, UserProduct } = require('../../../models/index')
const { Op } = require('sequelize')
const NotFoundError = require('../../../exceptions/NotFoundError')
const ConflictError = require('../../../exceptions/ConflictError')

exports.getCartItemsService = async (userId) => {
  const cartId = await getUserCartId(userId)
  const cart_items = await CartItem.findAll({
    attributes: [],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'discount_price', 'img_url']
      }
    ],
    where: { cart_id: cartId }
  })

  const cart_item_responses = cart_items.map((cart_item) => cart_item.product.toJSON())
  return { cartId, cart_items: cart_item_responses }
}

exports.postCartItemService = async (userId, productId) => {
  const cartId = await getUserCartId(userId)

  // cek apakah product tersebut ada
  await isProductExist(productId)

  // cek apakah ada product yang double di cart usernya
  await isProductAlreadyAddedInCart(cartId, productId)

  // cek apakah product sudah di order berdasarkan status dan cek di user_product berdasarkan status
  await orderStatusCheck(userId, productId)

  // tambahkan cart item ke tabel order_item
  await CartItem.create({ cart_id: cartId, product_id: productId })
}

exports.deleteCartItemService = async (userId, productLists) => {
  const cartId = await getUserCartId(userId)

  // cek apakah itemnya ada di keranjang user
  await isCartItemExist(cartId, productLists)

  // hapus item yang dipilih user
  await deleteCartItem(cartId, productLists)
}

async function getUserCartId(userId) {
  const cart = await Cart.findOne({
    where: {
      user_id: userId
    }
  })
  if (!cart) throw new NotFoundError('Cart not found')
  return cart.dataValues.id
}

async function isProductExist(productId) {
  const product = await Product.findOne({
    where: {
      id: productId
    }
  })
  if (!product) throw new NotFoundError('Product not found')
}

async function orderStatusCheck(userId, productId) {
  // status order check (success, pending, canceled)
  const order = await OrderItem.findOne({
    where: {
      [Op.and]: [
        { product_id: productId },
        { '$order.user_id$': userId }
      ]
    },
    include: [
      {
        model: Order,
        as: 'order',
        attributes: ['order_status']
      }
    ]
  })

  let orderStatus
  if (order) {
    orderStatus = order.dataValues.order.order_status
    if (orderStatus === 'pending') throw new ConflictError('Kamu sudah memesan item, namun belum melakukan pembayaran')
  }

  // status user_products check (active, finished)
  const userProduct = await UserProduct.findOne({
    include: [
      {
        model: Product
      }
    ],
    where: { product_id: productId, status: 'active' }
  })

  if (userProduct) {
    if (userProduct.Product.price === 0) throw new ConflictError('Kamu sudah mengikuti event ini')
    if (orderStatus === 'success' && userProduct.status) throw new ConflictError('Kamu sudah mengikuti course ini')
  }

}

async function isProductAlreadyAddedInCart(cartId, productId) {
  const cartItem = await CartItem.findOne({
    where: { cart_id: cartId, product_id: productId }
  })
  if (cartItem) throw new ConflictError('Product already added in your cart')
}

async function isCartItemExist(cartId, productLists) {
  const cart_items = await CartItem.findAll({
    where: {
      cart_id: cartId,
      product_id: { [Op.in]: productLists }
    }
  })
  if (cart_items.length !== productLists.length) throw new NotFoundError(`Product doesn't exist in the cart`)
}

async function deleteCartItem(cartId, productLists) {
  await CartItem.destroy({
    where: {
      cart_id: cartId,
      product_id: {
        [Op.in]: productLists
      }
    }
  })
}
