const express = require('express')
const router = express.Router()

router.use(require('./users/routes'))
router.use(require('./products/routes'))
router.use(require('./authentications/routes'))

module.exports = router
