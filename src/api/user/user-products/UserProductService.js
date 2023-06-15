const { UserProduct, Product, EventDate } = require('../../../models/index')
const { Op } = require('sequelize')

exports.getUserProductService = async (userId, limit) => {
  const user_products = await UserProduct.findAll({
    attributes: ['status', 'expired_date', 'meeting_quota', 'custom_field_1', 'custom_field_2', 'custom_field_3'],
    include: [
      {
        model: Product
      }
    ],
    where: {
      user_id: userId,
      product_id: {
        [Op.like]: '%course%'
      }
    },
    limit
  })

  const products = user_products.map((product) => ({
    id: product.Product.id,
    name: product.Product.name,
    img_url: product.Product.img_url,
    description: product.Product.description,
    status: product.status,
    expired_date: product.expired_date,
    meeting_quota: product.meeting_quota,
    custom_field_1: product.custom_field_1,
    custom_field_2: product.custom_field_2,
    custom_field_3: product.custom_field_3
  }))

  return products
}

exports.getUserEventsService = async (userId, limit) => {
  const user_products = await UserProduct.findAll({
    attributes: ['status', 'expired_date', 'custom_field_1', 'custom_field_2', 'custom_field_3'],
    include: [
      {
        model: Product,
        include: [
          {
            attributes: ['date'],
            model: EventDate
          }
        ]
      }
    ],
    where: {
      user_id: userId,
      product_id: {
        [Op.like]: '%event%'
      }
    },
    limit
  })

  const products = user_products.map((product) => ({
    id: product.Product.id,
    name: product.Product.name,
    img_url: product.Product.img_url,
    description: product.Product.description,
    quota: product.Product.quota,
    participants: product.Product.participants,
    event_dates: product.Product.event_dates,
    status: product.status,
    end_date: product.expired_date,
    custom_field_1: product.custom_field_1,
    custom_field_2: product.custom_field_2,
    custom_field_3: product.custom_field_3
  }))

  return products
}