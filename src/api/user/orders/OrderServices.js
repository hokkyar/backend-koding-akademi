const { Order, OrderItem, Product } = require('../../../models/index')
const { Op } = require('sequelize')

exports.getOrdersService = async (userId, orderStatus) => {
  let condition = {
    user_id: userId,
    order_status: orderStatus
  }

  if (orderStatus === 'all') {
    condition = {
      user_id: userId,
      [Op.or]: [{ order_status: 'active' }, { order_status: 'finished' }]
    }
  }

  const orders = await Order.findAll({
    attributes: ['id', 'order_status'],
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
    ],
    where: condition
  })
  return orders
}