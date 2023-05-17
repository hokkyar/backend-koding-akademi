const { Coupon, CouponProduct } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getCouponService = async (products) => {
  const coupon_products = await CouponProduct.findAll({
    include: [
      {
        model: Coupon
      }
    ],
    where: { product_id: products }
  })

  if (!coupon_products) throw new NotFoundError('Product not found')

  const coupons = coupon_products.map(({ coupon }) => ({
    id: coupon.id,
    coupon_code: coupon.coupon_code,
    discount: coupon.discount,
    coupon_start: coupon.coupon_start,
    coupon_end: coupon.coupon_end,
    quota: coupon.quota
  }))

  const filteredCoupon = coupons.filter((coupon, index, self) => {
    // return index === self.findIndex((c) => (c.id === coupon.id))
    const couponStart = new Date(coupon.coupon_start);
    const couponEnd = new Date(coupon.coupon_end);

    return (
      index === self.findIndex((c) => c.id === coupon.id) &&
      currentDate >= couponStart &&
      currentDate <= couponEnd
    );
  })

  return filteredCoupon
}