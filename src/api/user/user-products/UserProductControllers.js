const { getUserProductService, getUserEventsService } = require('./UserProductService')

exports.getUserProducts = async (req, res) => {
  const userId = req.user.id
  const products = await getUserProductService(userId)
  return res.json({
    message: 'Get all user products',
    data: products
  })
}

exports.getUserEvents = async (req, res) => {
  const userId = req.user.id
  const products = await getUserEventsService(userId)
  return res.json({
    message: 'Get all user events',
    data: products
  })
}
