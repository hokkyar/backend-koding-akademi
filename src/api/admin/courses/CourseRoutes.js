const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getCourses, getDetailCourse, postCourse, putCourse, deleteCourse } = require('./CourseControllers')

router.get('/courses', asyncHandler(getCourses))
router.get('/courses/:id', asyncHandler(getDetailCourse))
router.post('/courses', asyncHandler(postCourse))
router.put('/courses/:id', asyncHandler(putCourse))
router.delete('/courses/:id', asyncHandler(deleteCourse))

module.exports = router
