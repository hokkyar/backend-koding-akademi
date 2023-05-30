const { Cart, CartItem, Product, Order, OrderItem, UserProduct } = require('../../../models/index')
const { Op } = require('sequelize')
const NotFoundError = require('../../../exceptions/NotFoundError')
const ConflictError = require('../../../exceptions/ConflictError')

exports.getCartItemsService = async (userId) => {
  const cartId = await getUserCartId(userId)
  const cart_items = await CartItem.findAll({
    attributes: ['selected_date'],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'discount_price', 'img_url']
      }
    ],
    where: { cart_id: cartId }
  })

  const cart_item_responses = cart_items.map((cart_item) => {
    const product = cart_item.product.toJSON()
    product.selected_date = cart_item.selected_date
    return product
  })
  return { cartId, cart_items: cart_item_responses }
}

exports.postCartItemService = async (userId, productId, selectedDate) => {
  const cartId = await getUserCartId(userId)

  await isProductExist(productId)

  await isProductAlreadyAddedInCart(cartId, productId)

  await orderStatusCheck(userId, productId)

  await CartItem.create({ cart_id: cartId, product_id: productId, selected_date: selectedDate })
}

exports.deleteCartItemService = async (userId, productLists) => {
  const cartId = await getUserCartId(userId)

  await isCartItemExist(cartId, productLists)

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
  const ordered = await OrderItem.findOne({
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
        where: { order_status: 'pending' }
      }
    ]
  })

  if (ordered) throw new ConflictError(`This item has been ordered, but not yet paid`)

  const productActive = await UserProduct.findOne({
    include: [
      {
        model: Product
      }
    ],
    where: { product_id: productId, status: 'active', user_id: userId }
  })

  if (productActive) {
    if (productActive.Product.price === 0) throw new ConflictError('You have already attended this event')
    throw new ConflictError('You have already bought this course')
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
