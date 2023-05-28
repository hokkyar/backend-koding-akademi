const { UserCoupon } = require('../../../models/index')

exports.getUserCouponService = async (userId) => {
  const userCoupon = await UserCoupon.findAll({
    where: { user_id: userId }
  })

  return userCoupon
}
