const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { adminLogin, userLogin } = require('./LoginControllers')

router.post('/admin', asyncHandler(adminLogin))
router.post('/user', asyncHandler(userLogin))

module.exports = router
