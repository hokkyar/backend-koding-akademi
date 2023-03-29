const express = require('express')
const router = express.Router()

const { getCourses, getDetailCourse, postCourse } = require('./controllers')

router.get('/courses', getCourses)
router.get('/courses/:id', getDetailCourse)
router.post('/courses', postCourse)

module.exports = router
