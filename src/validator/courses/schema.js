const Joi = require('joi')

exports.CoursesBodySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discount_price: Joi.number().allow(null),
  description: Joi.string().allow(null),
  category_id: Joi.string().required(),
  img_url: Joi.string().allow(null),
  quota: Joi.number().allow(null),
})
