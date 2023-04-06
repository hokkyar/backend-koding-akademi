const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getCart, postCart, deleteCart } = require('./CartControllers')

router.get('/cart', asyncHandler(getCart))
router.post('/cart', asyncHandler(postCart))
router.delete('/cart', asyncHandler(deleteCart))

module.exports = router
