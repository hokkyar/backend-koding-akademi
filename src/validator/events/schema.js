const Joi = require('joi')

exports.EventsBodySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discount_price: Joi.number().allow(null),
  description: Joi.string().allow(null),
  img_url: Joi.string().allow(null),
  quota: Joi.number().allow(null),
  dates: Joi.array().allow(null)
})
