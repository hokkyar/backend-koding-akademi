const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getOrders } = require('./OrderControllers')

router.get('/orders', asyncHandler(getOrders))

module.exports = router
