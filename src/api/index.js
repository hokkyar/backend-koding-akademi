const router = require('express').Router()

router.use(require('./users/routes'))
router.use(require('./courses/routes'))
router.use(require('./authentications/routes'))

module.exports = router
