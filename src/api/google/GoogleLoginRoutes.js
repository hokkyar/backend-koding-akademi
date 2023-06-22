const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { googleLoginController } = require('./GoogleLoginControllers')
router.post('/', asyncHandler(googleLoginController))

module.exports = router
