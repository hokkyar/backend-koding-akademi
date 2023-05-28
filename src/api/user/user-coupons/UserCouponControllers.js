const { getUserCouponService } = require('./UserCouponServices')

exports.getUserCoupons = async (req, res) => {
  const userId = req.user.id
  const userCoupons = await getUserCouponService(userId)
  return res.json({
    status: 'success',
    message: 'Get all user coupons',
    data: userCoupons
  })
}
