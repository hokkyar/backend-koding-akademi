const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUserCoupons } = require('./UserCouponControllers')

router.get('/user-coupons', asyncHandler(getUserCoupons))

module.exports = router
