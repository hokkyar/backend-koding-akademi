const express = require('express')
const router = express.Router()

const { getCourses, getDetailCourse } = require('./controller')

router.get('/courses', getCourses)
router.get('/courses/:id', getDetailCourse)

module.exports = router
