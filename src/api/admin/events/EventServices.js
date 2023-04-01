const { Product, Category, EventDate } = require('../../../models/index')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getEventsService = async () => {
  const events = await Product.findAll({
    attributes: ['id', 'name', 'price', 'discount_price', 'description', 'img_url', 'quota'],
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      },
      {
        model: EventDate,
        attributes: ['date']
      }
    ],
    where: {
      category_id: 'cat-event-1'
    }
  })
  return events
}

exports.getDetailEventService = async (id) => {
  const event = await Product.findOne({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      },
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

exports.postEventService = async ({ name, price, discount_price, description, img_url, quota, dates }) => {
  const id = `event-${nanoid(16)}`
  await Product.create({
    id, name, price, discount_price, description, category_id: 'cat-event-1', img_url, quota
  })

  if (dates) {
    for (let i = 0; i < dates.length; i++) {
      await EventDate.create({
        product_id: id,
        date: dates[i]
      })
    }
  }
  return id
}

exports.putEventService = async (id, { name, price, discount_price, description, category_id, img_url, quota, dates }) => {
  const event = await Product.findOne({
    where: {
      category_id: 'cat-event-1',
      id
    }
  })
  if (!event) throw new NotFoundError('Event not found')

  await EventDate.destroy({ where: { product_id: id } })

  for (let i = 0; i < dates.length; i++) {
    await EventDate.create({
      product_id: id,
      date: dates[i]
    })
  }

  await Product.update({
    name, price, discount_price, description, category_id, img_url, quota
  }, {
    where: { id }
  })
}

exports.deleteEventService = async (id) => {
  const event = await Product.findOne({
    where: {
      category_id: 'cat-event-1',
      id
    }
  })
  if (!event) throw new NotFoundError('Event not found')
  await Product.destroy({
    where: { id }
  })
}
