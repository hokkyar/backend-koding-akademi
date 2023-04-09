const { getOrdersService } = require('./OrderServices')

exports.getOrders = async (req, res) => {
  const { status } = req.query
  let order_status = ['active', 'pending', 'canceled', 'finished'].includes(status) ? status : 'active'
  const userId = req.user.id
  const orders = await getOrdersService(userId, order_status)
  res.json({
    status: 'success',
    message: 'Get all orders',
    data: orders
  })
}