const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getUserCourse } = require('./MyCourseControllers')

router.get('/my-course', asyncHandler(getUserCourse))

module.exports = router
