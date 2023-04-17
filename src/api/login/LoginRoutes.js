const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { userLogin } = require('./LoginControllers')

router.post('/user', asyncHandler(userLogin))

module.exports = router
