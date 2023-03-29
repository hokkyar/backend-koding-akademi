const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { postAuthentication, putAuthentication, deleteAuthentication } = require('./controllers')

router.post('/authentications', asyncHandler(postAuthentication))
router.put('/authentications', asyncHandler(putAuthentication))
router.delete('/authentications', asyncHandler(deleteAuthentication))

module.exports = router
