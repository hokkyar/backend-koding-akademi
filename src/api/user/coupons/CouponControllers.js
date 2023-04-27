const { getCouponService } = require('./CouponService')

exports.getCoupons = async (req, res) => {
  const userId = req.user.id // user yang memakai kupon
  const coupons = await getCouponService(userId)
  return res.json({
    message: 'Get all coupons',
    coupons
  })
}
