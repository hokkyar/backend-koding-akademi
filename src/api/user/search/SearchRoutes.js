const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { searchCourses, searchEvents, searchArticles } = require('./SearchControllers')

router.get('/search/courses', asyncHandler(searchCourses))
router.get('/search/events', asyncHandler(searchEvents))
router.get('/search/articles', asyncHandler(searchArticles))

module.exports = router
