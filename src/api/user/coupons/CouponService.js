const { Coupon, CouponCategory } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getCouponService = async (userId) => {
  const coupons = await Coupon.findAll()
  return coupons
}