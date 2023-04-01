const { getEventsService, getDetailEventService } = require('./EventServices')

exports.getEvents = async (req, res) => {
  const events = await getEventsService()
  return res.json({
    message: 'Get all events',
    events
  })
}

exports.getDetailEvent = async (req, res) => {
  const { id } = req.params
  const event = await getDetailEventService(id)
  return res.json({
    message: 'Get detail event',
    event
  })
}
