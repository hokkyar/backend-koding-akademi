const { getUserProductService, getUserEventsService } = require('./UserProductService')

exports.getUserProducts = async (req, res) => {
  const userId = req.user.id
  const limit = parseInt(req.query.limit) || 10
  const products = await getUserProductService(userId, limit)
  return res.json({
    status: 'success',
    message: 'Get all user products',
    data: products
  })
}

exports.getUserEvents = async (req, res) => {
  const userId = req.user.id
  const limit = parseInt(req.query.limit) || 10
  console.log(limit)
  const products = await getUserEventsService(userId, limit)
  return res.json({
    status: 'success',
    message: 'Get all user events',
    data: products
  })
}
