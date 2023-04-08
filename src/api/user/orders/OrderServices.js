const { Order, OrderItem } = require('../../../models/index')

exports.getOrdersService = async (userId) => {
  const orders = await OrderItem.findAll({
    where: { user_id: userId }
  })
  return orders
}