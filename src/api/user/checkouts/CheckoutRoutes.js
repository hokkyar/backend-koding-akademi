const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { checkoutByProductId } = require('./CheckoutControllers')

router.get('/checkouts/:id', asyncHandler(checkoutByProductId))

module.exports = router
