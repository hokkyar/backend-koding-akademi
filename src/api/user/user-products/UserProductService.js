const { UserProduct } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getUserProductService = async (userId) => {
  const products = await UserProduct.findAll({
    where: { user_id: userId }
  })
  return products
}