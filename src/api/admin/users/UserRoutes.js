const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUsers, getDetailUser, deleteUser } = require('./UserControllers')

router.get('/users', asyncHandler(getUsers))
router.get('/users/:id', asyncHandler(getDetailUser))
router.delete('/users/:id', asyncHandler(deleteUser))

module.exports = router
