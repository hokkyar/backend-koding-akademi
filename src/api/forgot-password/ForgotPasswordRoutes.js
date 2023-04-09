const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { forgotPassword, resetPassswordPage, updatePassword, redirectPage } = require('./ForgotPasswordControllers')

router.post('/', asyncHandler(forgotPassword))
router.get('/', asyncHandler(resetPassswordPage))
router.put('/', asyncHandler(updatePassword))
router.get('/redirect', asyncHandler(redirectPage))

module.exports = router
