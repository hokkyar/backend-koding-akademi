const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getCarts } = require('./CartControllers')

router.get('/carts', asyncHandler(getCarts))

module.exports = router
