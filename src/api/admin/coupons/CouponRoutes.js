const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getCoupons } = require('./CouponControllers')

router.get('/coupons', asyncHandler(getCoupons))

module.exports = router