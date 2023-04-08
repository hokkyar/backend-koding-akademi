const { getOrdersService } = require('./OrderServices')

exports.getOrders = async (req, res) => {
  const userId = req.user.id
  const orders = await getOrdersService(userId)
  res.json({
    status: 'success',
    message: 'Get all orders',
    orders
  })
}