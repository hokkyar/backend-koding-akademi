const router = require('express').Router()

router.use(require('./users/routes'))
router.use(require('./courses/routes'))
router.use(require('./authentications/routes'))
router.use(require('./articles/routes'))
router.use(require('./payments/routes'))

module.exports = router
