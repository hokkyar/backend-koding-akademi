const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { checkoutProducts } = require('./CheckoutControllers')

router.post('/checkouts', asyncHandler(checkoutProducts))

module.exports = router
