const express = require('express')
const router = express.Router()

const { getCourses } = require('./controller')

router.get('/products', getCourses)

module.exports = router
