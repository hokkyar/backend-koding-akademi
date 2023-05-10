const { getCouponService } = require('./CouponService')

exports.getCoupons = async (req, res) => {
  const coupons = await getCouponService(userId)
  return res.json({
    message: 'Get all coupons',
    coupons
  })
}
