const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')

router.use('/login', require('./login/LoginRoutes'))
router.use('/register', require('./register/RegisterRoutes'))
// testing dengan token
// router.use('/admin', verifyToken, verifyAdmin, require('./admin/index'))
// router.use('/user', verifyToken, require('./user/index'))

// testing tanpa token
router.use('/admin', require('./admin/index'))
router.use('/user', require('./user/index'))

module.exports = router
