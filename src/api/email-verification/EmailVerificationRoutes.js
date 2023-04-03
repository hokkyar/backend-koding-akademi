const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { emailVerification } = require('./EmailVerificationControllers')

router.get('/', asyncHandler(emailVerification))

module.exports = router
