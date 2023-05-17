const { getCouponService } = require('./CouponService')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getCoupons = async (req, res) => {
  const { products } = req.query
  if (!products) throw new NotFoundError('Product not found')
  const coupons = await getCouponService(products)
  return res.json({
    message: 'Get all coupons',
    data: coupons
  })
}
