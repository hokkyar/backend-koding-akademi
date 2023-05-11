const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUserProducts, getUserEvents } = require('./UserProductControllers')

router.get('/user-products/courses', asyncHandler(getUserProducts))
router.get('/user-products/events', asyncHandler(getUserEvents))

module.exports = router
