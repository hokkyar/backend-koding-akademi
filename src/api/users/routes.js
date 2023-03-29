const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUsers, getDetailUser, postUser, putUser, deleteUser } = require('./controllers')

router.get('/users', asyncHandler(getUsers))
router.get('/users/:id', asyncHandler(getDetailUser))
router.post('/users', asyncHandler(postUser))
router.put('/users/:id', asyncHandler(putUser))
router.delete('/users/:id', asyncHandler(deleteUser))

module.exports = router
