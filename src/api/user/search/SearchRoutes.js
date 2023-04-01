const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getContentByQuery } = require('./SearchControllers')

router.get('/search', asyncHandler(getContentByQuery))

module.exports = router
