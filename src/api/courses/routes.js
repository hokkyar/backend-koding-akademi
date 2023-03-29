const express = require('express')
const router = express.Router()

const { getCourses, getDetailCourse, postCourse, putCourse, deleteCourse } = require('./controller')

router.get('/courses', getCourses)
router.get('/courses/:id', getDetailCourse)
router.post('/courses', postCourse)
router.put('/courses/:id', putCourse)
router.delete('/courses/:id', deleteCourse)

module.exports = router
