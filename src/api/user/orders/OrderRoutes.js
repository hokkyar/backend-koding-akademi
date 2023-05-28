const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getOrders, getDetailOrder } = require('./OrderControllers')

router.get('/orders', asyncHandler(getOrders))
router.get('/orders/:id', asyncHandler(getDetailOrder))

module.exports = router
