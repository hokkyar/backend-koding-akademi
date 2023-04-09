const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { xenditCallbackController } = require('./XenditCallbackControllers')

router.post('/', asyncHandler(xenditCallbackController))

module.exports = router
