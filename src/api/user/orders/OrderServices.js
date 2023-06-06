const { Order, OrderItem, Product, Transaction } = require('../../../models/index')
const { Op } = require('sequelize')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getOrdersService = async (userId, orderStatus) => {
  let condition = {
    user_id: userId,
    order_status: orderStatus
  }

  if (orderStatus === 'all') {
    condition = {
      user_id: userId,
      [Op.or]: [{ order_status: 'success' }, { order_status: 'canceled' }, { order_status: 'pending' }]
    }
  }

  const orders = await Order.findAll({
    // attributes: ['id', 'order_status', 'total', 'invoice_id', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderItem,
        attributes: ['product_id'],
        as: 'order',
        include: [
          {
            model: Product,
            attributes: ['name', 'price', 'discount_price', 'description', 'img_url', 'quota']
          }
        ]
      },
      {
        model: Transaction,
        as: 'transaction',
        attributes: ['payment_method', 'payment_status', 'amount', 'date', 'bank_name']
      }
    ],
    where: condition
  })
  return orders
}

exports.getDetailOrderService = async (userId, orderId) => {
  const order = await Order.findOne({
    // attributes: ['id', 'order_status', 'total', 'discount', 'invoice_id', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderItem,
        attributes: ['product_id'],
        as: 'order',
        include: [
          {
            model: Product,
            attributes: ['name', 'price', 'discount_price', 'description', 'img_url', 'quota']
          }
        ]
      },
      {
        model: Transaction,
        as: 'transaction',
        attributes: ['payment_method', 'payment_status', 'amount', 'date', 'bank_name']
      }
    ],
    where: {
      id: orderId,
      user_id: userId
    }
  })
  if (!order) throw new NotFoundError('Order not found')
  return order
}
