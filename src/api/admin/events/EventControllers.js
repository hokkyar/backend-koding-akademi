const { getEventsService, getDetailEventService, postEventService, putEventService, deleteEventService } = require('./EventServices')
const { validateEventsBody } = require('../../../validator/events')

exports.getEvents = async (req, res) => {
  const events = await getEventsService()
  return res.json({
    status: 'success',
    message: 'Get all events',
    data: events
  })
}

exports.getDetailEvent = async (req, res) => {
  const { id } = req.params
  const event = await getDetailEventService(id)
  return res.json({
    status: 'success',
    message: 'Get detail event',
    data: event
  })
}

exports.postEvent = async (req, res) => {
  validateEventsBody(req.body)
  const id = await postEventService(req.body)
  return res.json({
    status: 'success',
    message: 'Event added',
    id
  })
}

exports.putEvent = async (req, res) => {
  validateEventsBody(req.body)
  const { id } = req.params
  await putEventService(id, req.body)
  return res.json({
    status: 'success',
    message: 'Event updated',
    id
  })
}

exports.deleteEvent = async (req, res) => {
  const { id } = req.params
  await deleteEventService(id)
  return res.json({
    status: 'success',
    message: 'Event deleted',
    id
  })
}