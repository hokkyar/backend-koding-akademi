const { User, Order, OrderItem, Product, Cart, CartItem, UserProduct, Coupon, UserCoupon, Sequelize } = require('../../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')
const ConflictError = require('../../../exceptions/ConflictError')
const createPayment = require('../../../utils/createPayment')

exports.checkoutProductsService = async (productList, userId, couponId) => {
  const cartId = await getUserCartId(userId)

  await isCartEmptyCheck(cartId)
  await isProductAndUserCartItemExist(cartId, productList)

  const zeroPriceProducts = await getZeroPriceProducts(productList, userId)
  const productToOrder = productList.filter((product) => !zeroPriceProducts.includes(product))

  if (productToOrder.length !== 0) {
    const orderId = `order-${nanoid(16)}`
    await Order.create({
      id: orderId, user_id: userId, order_status: 'pending'
    })

    await addProductsToOrderItem(orderId, productToOrder)
    let { amount, productNames } = await getTotalAmount(productToOrder)

    if (couponId) {
      const coupon = await Coupon.findOne({
        where: { id: couponId }
      })

      if (!coupon) throw new NotFoundError('Coupon not found')
      if (coupon.quota === 0) throw new ConflictError('Coupon quota is full')

      const userCoupon = await UserCoupon.findOne({
        where: {
          user_id: userId,
          coupon_id: coupon.id
        }
      })
      if (userCoupon) throw new ConflictError('Coupon has been used')

      await UserCoupon.create({ user_id: userId, coupon_id: coupon.id, use_date: new Date })
      amount = amount - coupon.discount
      await Coupon.decrement('quota', { where: { id: couponId } })
    }
    const email = await getUserEmail(userId)
    const description = generateDescription(productNames)
    const xenditResponse = await createPayment(orderId, amount, email, description)
    await deleteCartItem(cartId, productList)
    return xenditResponse
  }

  await deleteCartItem(cartId, productList)
  return 'Event registered'
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

async function isProductAndUserCartItemExist(cartId, productList) {
  // cek apakah product tersebut ada
  const products = await Product.findAll({
    where: {
      id: { [Op.in]: productList }
    }
  })
  if (products.length !== productList.length) throw new NotFoundError('Product not found')

  // cek apakah yang di checkout itu ada di cart usernya
  const items = await CartItem.findAll({
    where: { cart_id: cartId, product_id: productList }
  })
  if (items.length !== productList.length) throw new NotFoundError('Product is not available in your cart')
}

async function deleteCartItem(cartId, productList) {
  await CartItem.destroy({
    where: {
      cart_id: cartId,
      product_id: {
        [Op.in]: productList
      }
    }
  })
}

async function addProductsToOrderItem(orderId, productList) {
  const orderItems = productList.map((productId) => ({
    id: `orderitem-${nanoid(16)}`,
    order_id: orderId,
    product_id: productId
  }))
  await OrderItem.bulkCreate(orderItems)
}

async function getTotalAmount(productList) {
  const products = await Product.findAll({
    attributes: [
      'name',
      [Sequelize.literal('IFNULL(discount_price, price)'), 'total_price']
    ],
    where: {
      id: { [Op.in]: productList }
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

async function getZeroPriceProducts(productList, userId) {
  const zeroProductId = []
  const products = await Product.findAll({
    where: {
      id: productList,
      price: 0
    }
  })

  if (products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].participants >= products[i].quota) throw new ConflictError("Quota is full")
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
