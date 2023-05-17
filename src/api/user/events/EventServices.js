const { Product, EventDate } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getEventsService = async (limit) => {
  const events = await Product.findAll({
    attributes: ['id', 'name', 'price', 'participants', 'discount_price', 'description', 'img_url', 'quota'],
    include: [
      {
        model: EventDate,
        attributes: ['date']
      }
    ],
    where: {
      category_id: 'cat-event-1'
    },
    limit
  })
  return events
}

exports.getDetailEventService = async (id) => {
  const event = await Product.findOne({
    attributes: ['id', 'name', 'price', 'participants', 'discount_price', 'description', 'img_url', 'quota'],
    include: [
      {
        model: EventDate,
        attributes: ['date']
      }
    ],
    where: {
      id,
      category_id: 'cat-event-1'
    }
  })

  if (!event) throw new NotFoundError('Event not found')
  return event
}
