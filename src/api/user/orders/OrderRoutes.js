const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getOrders, getOrderDetail } = require('./OrderControllers')

router.get('/orders', asyncHandler(getOrders))
router.get('/orders/:id', asyncHandler(getOrderDetail))

module.exports = router
