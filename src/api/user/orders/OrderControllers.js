const { getOrdersService } = require('./OrderServices')

exports.getOrders = async (req, res) => {
  const { status } = req.query
  let orderStatus = ['active', 'pending', 'canceled', 'finished'].includes(status) ? status : 'all'
  const userId = req.user.id
  const orders = await getOrdersService(userId, orderStatus)
  res.json({
    status: 'success',
    message: `Get ${orderStatus === 'all' ? 'all' : 'all ' + orderStatus} orders`,
    data: orders
  })
}