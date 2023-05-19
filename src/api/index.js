const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')

router.use('/login', require('./login/LoginRoutes'))
router.use('/register', require('./register/RegisterRoutes'))
router.use('/email-verification', require('./email-verification/EmailVerificationRoutes'))
router.use('/authentications', require('./authentications/AuthenticationRoutes'))
router.use('/forgot-password', require('./forgot-password/ForgotPasswordRoutes'))
router.use('/xendit-callback', require('./xendit-callback/XenditCallbackRoutes'))
router.use('/user', verifyToken, require('./user/index'))
router.use('/auth/google', require('./google/GoogleLoginRoutes'))

module.exports = router
