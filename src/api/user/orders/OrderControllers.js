const { getOrdersService, getDetailOrderService } = require('./OrderServices')

exports.getOrders = async (req, res) => {
  const { status } = req.query
  let orderStatus = ['success', 'pending', 'canceled'].includes(status) ? status : 'all'
  const userId = req.user.id
  const orders = await getOrdersService(userId, orderStatus)
  res.json({
    status: 'success',
    message: `Get ${orderStatus === 'all' ? 'all' : 'all ' + orderStatus} orders`,
    data: orders
  })
}

exports.getDetailOrder = async (req, res) => {
  const userId = req.user.id
  const order = await getDetailOrderService(userId, req.params.id)
  res.json({
    status: 'success',
    message: 'Get detail order',
    data: order
  })
}