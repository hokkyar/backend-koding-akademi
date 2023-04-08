const { Cart, CartItem, Product, Order, OrderItem } = require('../../../models/index')
const { Op } = require('sequelize')
const NotFoundError = require('../../../exceptions/NotFoundError')
const ConflictError = require('../../../exceptions/ConflictError')

exports.getCartItemsService = async (userId) => {
  const cartId = await getUserCartId(userId)
  const cart_items = await CartItem.findAll({
    attributes: ['createdAt'],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'discount_price', 'img_url']
      }
    ],
    where: { cart_id: cartId }
  })
  return { cartId, cart_items }
}

exports.postCartItemService = async (userId, productId) => {
  const cartId = await getUserCartId(userId)

  // cek apakah product tersebut ada
  await isProductExist(productId)

  // cek apakah product tersebut sudah di order sebelumnya oleh user
  await isProductAlreadyOrdered(userId, productId)

  // cek apakah ada product yang double di cart usernya
  await isProductAlreadyAddedInCart(cartId, productId)

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

async function isProductAlreadyOrdered(userId, productId) {
  const productAlreadyOrdered = await OrderItem.findOne({
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
        attributes: ['user_id']
      }
    ]
  })
  if (productAlreadyOrdered) throw new ConflictError('Product already ordered')
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
