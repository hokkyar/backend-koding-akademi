const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { putAuthentication, deleteAuthentication } = require('./AuthenticationControllers')

router.put('/authentications', asyncHandler(putAuthentication))
router.delete('/authentications', asyncHandler(deleteAuthentication))

module.exports = router
