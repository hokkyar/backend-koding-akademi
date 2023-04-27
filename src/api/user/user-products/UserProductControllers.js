const { getUserProductService } = require('./UserProductService')

exports.getUserProducts = async (req, res) => {
  const userId = req.user.id
  const products = await getUserProductService(userId)
  return res.json({
    message: 'Get all user products',
    products
  })
}
