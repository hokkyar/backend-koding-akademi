const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getEvents, getDetailEvent } = require('./EventControllers')

router.get('/events', asyncHandler(getEvents))
router.get('/events/:id', asyncHandler(getDetailEvent))
// router.post('/events/free-register', asyncHandler(freeRegister))

module.exports = router
