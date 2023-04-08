const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getCartItems, postCartItem, deleteCartItem } = require('./CartControllers')

router.get('/cart', asyncHandler(getCartItems))
router.post('/cart', asyncHandler(postCartItem))
router.delete('/cart', asyncHandler(deleteCartItem))

module.exports = router
