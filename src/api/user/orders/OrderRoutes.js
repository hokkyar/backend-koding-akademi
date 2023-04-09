const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getOrders } = require('./OrderControllers')

// orders?status=active
// orders?status=canceled???
// orders?status=pending
// orders?status=finished

router.get('/orders', asyncHandler(getOrders))

module.exports = router
