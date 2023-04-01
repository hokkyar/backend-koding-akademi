const Joi = require('joi')

exports.ArticlesBodySchema = Joi.object({
  title: Joi.string().max(100).required(),
  image_url: Joi.string().allow(null),
  content: Joi.string().allow(null)
})
