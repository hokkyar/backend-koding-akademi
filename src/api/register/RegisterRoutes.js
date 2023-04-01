const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { userRegister } = require('./RegisterControllers')

router.post('/register', asyncHandler(userRegister))

module.exports = router
