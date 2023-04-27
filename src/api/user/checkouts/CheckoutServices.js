const { User, Order, OrderItem, Product, Cart, CartItem, UserProduct, Sequelize } = require('../../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')
const InvariantError = require('../../../exceptions/InvariantError')
const createPayment = require('../../../utils/createPayment')

exports.checkoutProductsService = async (productLists, userId) => {
  // ambil cartId yang user punya
  const cartId = await getUserCartId(userId)

  // cek apakah cartnya masih kosong (kalo kosong gak bisa checkout)
  await isCartEmptyCheck(cartId)

  // cek apakah product yang akan di checkout ada di db, dan apakah ada di cart user
  await isProductAndUserCartItemExist(cartId, productLists)

  // buat ordernya
  const orderId = `order-${nanoid(16)}`
  await Order.create({
    id: orderId, user_id: userId, order_status: 'pending'
  })

  // cek apakah ada product yang harganya 0
  const zeroPriceProducts = await getZeroPriceProducts(productLists, userId)
  const productToOrder = productLists.filter((product) => !zeroPriceProducts.includes(product))

  await addProductsToOrderItem(orderId, productToOrder)
  await deleteCartItem(cartId, productToOrder)

  const { amount, productNames } = await getTotalAmount(productToOrder)
  const email = await getUserEmail(userId)
  const description = generateDescription(productNames)
  const xenditResponse = await createPayment(orderId, amount, email, description)
  return xenditResponse
}

async function getUserCartId(userId) {
  const cart = await Cart.findOne({
    where: { user_id: userId }
  })
  if (!cart) throw new NotFoundError('Cart not found')
  return cart.dataValues.id
}

async function isCartEmptyCheck(cartId) {
  const cartItems = await CartItem.findOne({
    where: { cart_id: cartId }
  })
  if (!cartItems) throw new NotFoundError('Cart is empty')
}

async function isProductAndUserCartItemExist(cartId, productLists) {
  // cek apakah product tersebut ada
  const products = await Product.findAll({
    where: {
      id: { [Op.in]: productLists }
    }
  })
  if (products.length !== productLists.length) throw new NotFoundError('Product not found')

  // cek apakah yang di checkout itu ada di cart usernya
  const items = await CartItem.findAll({
    where: { cart_id: cartId, product_id: productLists }
  })
  if (items.length !== productLists.length) throw new NotFoundError('Product is not available in your cart')
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

async function addProductsToOrderItem(orderId, productLists) {
  const orderItems = productLists.map((productId) => ({
    id: `orderitem-${nanoid(16)}`,
    order_id: orderId,
    product_id: productId
  }))
  await OrderItem.bulkCreate(orderItems)
}

async function getTotalAmount(productLists) {
  const products = await Product.findAll({
    attributes: [
      'name',
      [Sequelize.literal('IFNULL(discount_price, price)'), 'total_price']
    ],
    where: {
      id: { [Op.in]: productLists }
    }
  })
  const amount = products.reduce((acc, curr) => acc + curr.getDataValue('total_price'), 0)
  const productNames = products.map((product) => product.getDataValue('name'))
  return { amount, productNames }
}

async function getUserEmail(userId) {
  const { email } = await User.findOne({
    attributes: ['email'],
    where: { id: userId }
  })
  return email
}

async function getZeroPriceProducts(productLists, userId) {
  const zeroProductId = []
  const products = await Product.findAll({
    where: {
      id: productLists,
      price: 0
    }
  })

  if (products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].participants >= products[i].quota) throw new InvariantError("Quota is full")
      zeroProductId.push(products[i].id)
      await Product.increment('participants', { where: { id: products[i].id } })
    }

    const eventItems = products.map((event) => ({
      user_id: userId,
      product_id: event.id,
      status: 'active'
    }))
    await UserProduct.bulkCreate(eventItems)
  }

  return zeroProductId
}

function generateDescription(productNames) {
  const length = productNames.length;

  if (length === 0) {
    return ''
  } else if (length === 1) {
    return `Pembayaran ${productNames[0]}`
  } else if (length === 2) {
    return `Pembayaran ${productNames[0]} & ${productNames[1]}`
  } else {
    const lastProduct = productNames[length - 1]
    const otherProducts = productNames.slice(0, length - 1).join(', ')
    return `Pembayaran ${otherProducts} & ${lastProduct}`
  }
}
