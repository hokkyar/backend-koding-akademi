const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getCourses, getDetailCourse } = require('./CourseControllers')

router.get('/courses', asyncHandler(getCourses))
router.get('/courses/:id', asyncHandler(getDetailCourse))

module.exports = router
