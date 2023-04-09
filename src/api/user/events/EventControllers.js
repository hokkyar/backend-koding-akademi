const { getEventsService, getDetailEventService } = require('./EventServices')

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
