const { User, Student, Order, OrderItem, Product, Cart, CartItem, UserProduct, Coupon, UserCoupon, Sequelize } = require('../../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')
const ConflictError = require('../../../exceptions/ConflictError')
const createPayment = require('../../../utils/createPayment')

exports.checkoutProductsService = async (productList, userId, couponId, custom_field_1, custom_field_2, custom_field_3) => {
  const cartId = await getUserCartId(userId)

  await isCartEmptyCheck(cartId)
  await isProductAndUserCartItemExist(cartId, productList)

  const zeroPriceProducts = await getZeroPriceProducts(cartId, productList, userId)
  const productToOrder = productList.filter((product) => !zeroPriceProducts.includes(product))

  if (productToOrder.length !== 0) {
    let { amount, productNames } = await getTotalAmount(productToOrder)
    let discount = null
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
      discount = coupon.discount
      amount = amount - discount
      await Coupon.decrement('quota', { where: { id: couponId } })
    }

    const orderId = `order-${nanoid(16)}`
    const { email, full_name, phone_number } = await getUserInfo(userId)
    const description = generateDescription(productNames)
    const xenditInvoice = await createPayment(orderId, amount, full_name, phone_number, email, description)
    await Order.create({
      id: orderId, user_id: userId, order_status: 'pending', total: amount, invoice_id: xenditInvoice.id, discount, custom_field_1, custom_field_2, custom_field_3
    })
    await addProductsToOrderItem(cartId, orderId, productToOrder)
    await deleteCartItem(cartId, productList)
    return xenditInvoice
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

async function addProductsToOrderItem(cartId, orderId, productList) {
  const cart_items_event = await CartItem.findAll({
    attributes: ['selected_date'],
    where: {
      cart_id: cartId,
      product_id: productList
    },
    include: [
      {
        model: Product,
        as: 'product',
        where: {
          category_id: 'cat-event-1'
        }
      }
    ]
  })

  const cart_items_course = await CartItem.findAll({
    attributes: ['selected_date'],
    where: {
      cart_id: cartId,
      product_id: productList
    },
    include: [
      {
        model: Product,
        as: 'product',
        where: {
          category_id: {
            [Op.like]: '%course%'
          }
        }
      }
    ]
  })

  if (cart_items_event.length !== 0) {
    const events = cart_items_event.map((item) => ({
      id: `orderitem-${nanoid(16)}`,
      order_id: orderId,
      product_id: item.product.id,
      selected_date: item.selected_date
    }))
    await OrderItem.bulkCreate(events)
  }

  if (cart_items_course.length !== 0) {
    const courses = cart_items_course.map((item) => ({
      id: `orderitem-${nanoid(16)}`,
      order_id: orderId,
      product_id: item.product.id
    }))
    await OrderItem.bulkCreate(courses)
  }
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

async function getUserInfo(userId) {
  const student = await Student.findOne({
    attributes: ['phone_number'],
    include: [
      {
        model: User,
        attributes: ['full_name', 'email']
      }
    ],
    where: { user_id: userId }
  })
  return { email: student.User.email, full_name: student.User.full_name, phone_number: student.phone_number }
}

async function getZeroPriceProducts(cartId, productList, userId) {
  const zeroProductId = []
  const cart_items = await CartItem.findAll({
    attributes: ['selected_date'],
    where: {
      cart_id: cartId,
      product_id: productList
    },
    include: [
      {
        model: Product,
        as: 'product',
        where: {
          price: 0
        }
      }
    ]
  })

  if (cart_items.length !== 0) {
    for (let i = 0; i < cart_items.length; i++) {
      if (cart_items[i].product.participants >= cart_items[i].product.quota) throw new ConflictError("Quota is full")
      zeroProductId.push(cart_items[i].product.id)
      await Product.increment('participants', { where: { id: cart_items[i].product.id } })
    }

    const eventItems = cart_items.map((item) => ({
      user_id: userId,
      product_id: item.product.id,
      status: 'active',
      expired_date: item.selected_date
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
