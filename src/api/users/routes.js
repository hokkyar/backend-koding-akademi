const express = require('express')
const router = express.Router()

const { getUsers } = require('./controller')

router.get('/users', getUsers)

module.exports = router
