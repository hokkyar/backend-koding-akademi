const express = require('express')
const router = express.Router()

const { getUsers, getDetailUser, postUser, putUser, deleteUser } = require('./controllers')

router.get('/users', getUsers)
router.get('/users/:id', getDetailUser)
router.post('/users', postUser)
router.put('/users/:id', putUser)
router.delete('/users/:id', deleteUser)

module.exports = router
