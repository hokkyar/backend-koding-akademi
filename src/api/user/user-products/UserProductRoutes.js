const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUserProducts } = require('./UserProductControllers')

router.get('/user-products', asyncHandler(getUserProducts))

module.exports = router
