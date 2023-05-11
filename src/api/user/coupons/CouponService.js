const { Coupon, CouponProduct } = require('../../../models/index')

exports.getCouponService = async (products) => {
  const coupon_products = await CouponProduct.findAll({
    include: [
      {
        model: Coupon
      }
    ],
    where: { product_id: products }
  })

  const coupons = coupon_products.map(({ coupon }) => ({
    id: coupon.id,
    coupon_code: coupon.coupon_code,
    discount: coupon.discount,
    coupon_start: coupon.coupon_start,
    coupon_end: coupon.coupon_end,
    quota: coupon.quota
  }))

  const filteredCoupon = coupons.filter((coupon, index, self) => {
    return index === self.findIndex((c) => (c.id === coupon.id))
  })

  return filteredCoupon
}