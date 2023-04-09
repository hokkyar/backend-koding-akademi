const { User, Order, OrderItem, Product, Cart, CartItem, Sequelize } = require('../../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')
const createPayment = require('../../../utils/createPayment')

// order_status = active, finished, pending, canceled

exports.checkoutProductsService = async (productLists, userId) => {
  // ambil cartId yang user punya
  const cartId = await getUserCartId(userId)

  // cek apakah cartnya masih kosong (kalo kosong gak bisa checkout)
  await isCartEmptyCheck(cartId)

  // cek apakah product yang akan di checkout ada di db, dan apakah di ada di cart user
  await isProductAndUserCartItemExist(cartId, productLists)

  // buat ordernya
  const orderId = `order-${nanoid(16)}`
  await Order.create({
    id: orderId, user_id: userId, order_status: 'pending'
  })

  // tambahkan setiap productnya ke order item
  await addProductsToOrderItem(orderId, productLists)

  // hapus product yang di checkout dari keranjang user
  await deleteCartItem(cartId, productLists)

  // hitung total harga productnya
  const { amount, productNames } = await getTotalAmount(productLists)

  // dapatkan email usernya
  const email = await getUserEmail(userId)

  // buat deskripsi
  const description = generateDescription(productNames)

  // buat invoice_url nya
  const invoice_url = await createPayment(amount, email, description)
  return invoice_url
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