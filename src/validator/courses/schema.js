const Joi = require('joi')

exports.CoursesBodySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discount_price: Joi.number().required(),
  description: Joi.string(),
  category_id: Joi.string().required(),
  img_url: Joi.string(),
  quota: Joi.number(),
})
