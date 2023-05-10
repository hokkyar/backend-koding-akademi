const { Coupon } = require('../../../models/index')

exports.getCouponService = async () => {
  const coupons = await Coupon.findAll()
  return coupons
}