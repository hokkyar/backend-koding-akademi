const router = require('express').Router()
// const verifyToken = require('../middleware/verifyToken')
// const verifyAdmin = require('../middleware/verifyAdmin')
// const verifyUser = require('../middleware/verifyUser')

router.use('/login', require('./login/LoginRoutes'))
router.use('/register', require('./register/RegisterRoutes'))
router.use('/email-verification', require('./email-verification/EmailVerificationRoutes'))

// routes dengan token
// router.use('/admin', verifyToken, verifyAdmin, require('./admin/index'))
// router.use('/user', verifyToken, verifyUser, require('./user/index'))

// routes tanpa token
router.use('/admin', require('./admin/index'))
router.use('/user', require('./user/index'))

module.exports = router
