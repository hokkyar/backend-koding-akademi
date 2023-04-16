const router = require('express').Router()

router.use(require('./articles/routes'))
router.use(require('./coupons/routes'))
router.use(require('./courses/routes'))
router.use(require('./events/routes'))
router.use(require('./qr-code/routes'))
router.use(require('./users/routes'))
router.use(require('./dashboard/routes'))
router.use(require('./profile/routes'))
router.use(require('./faq/routes'))
router.use(require('./contact/routes'))

module.exports = router
