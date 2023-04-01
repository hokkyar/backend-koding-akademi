const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getEvents, getDetailEvent, postEvent, putEvent, deleteEvent } = require('./EventControllers')

router.get('/events', asyncHandler(getEvents))
router.get('/events/:id', asyncHandler(getDetailEvent))
router.post('/events', asyncHandler(postEvent))
router.put('/events/:id', asyncHandler(putEvent))
router.delete('/events/:id', asyncHandler(deleteEvent))

module.exports = router
