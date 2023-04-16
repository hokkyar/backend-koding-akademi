const router = require('express').Router()

router.use(require('./articles/routes'))
router.use(require('./coupons/routes'))
router.use(require('./courses/routes'))
router.use(require('./events/routes'))
router.use(require('./qr-code/routes'))
router.use(require('./users/routes'))

module.exports = router
