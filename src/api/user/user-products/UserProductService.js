const { UserProduct, Product, EventDate } = require('../../../models/index')
const { Op } = require('sequelize')

exports.getUserProductService = async (userId, limit) => {
  const user_products = await UserProduct.findAll({
    attributes: ['status', 'expired_date'],
    include: [
      {
        model: Product
      }
    ],
    where: { user_id: userId },
    limit
  })

  const products = user_products.map((product) => ({
    id: product.Product.id,
    name: product.Product.name,
    img_url: product.Product.img_url,
    description: product.Product.description,
    status: product.status,
    expired_date: product.expired_date
  }))

  return products
}

exports.getUserEventsService = async (userId, limit) => {
  const user_products = await UserProduct.findAll({
    attributes: ['status', 'expired_date'],
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
    end_date: product.expired_date
  }))

  return products
}