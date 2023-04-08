const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { resetPassword } = require('./ResetPasswordControllers')

router.put('/reset-password', asyncHandler(resetPassword))

module.exports = router
