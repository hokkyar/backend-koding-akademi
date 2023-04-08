const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { putAuthentication, deleteAuthentication } = require('./AuthenticationControllers')

router.put('/', asyncHandler(putAuthentication))
router.delete('/', asyncHandler(deleteAuthentication))

module.exports = router
