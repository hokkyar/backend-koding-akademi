const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUserData, editUserData } = require('./ProfileControllers')

router.get('/profile', asyncHandler(getUserData))
router.put('/profile', asyncHandler(editUserData))

module.exports = router
