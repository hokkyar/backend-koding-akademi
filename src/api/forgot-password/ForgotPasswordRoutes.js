const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { forgotPassword, confirmForgotPassword, verifyForgotPassword, redirectPage } = require('./ForgotPasswordControllers')

router.post('/', asyncHandler(forgotPassword))
router.get('/', asyncHandler(confirmForgotPassword))
router.put('/', asyncHandler(verifyForgotPassword))
router.get('/redirect', asyncHandler(redirectPage))

module.exports = router
