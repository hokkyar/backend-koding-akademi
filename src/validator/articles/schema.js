const Joi = require('joi')

exports.ArticlesBodySchema = Joi.object({
  title: Joi.string().max(100).required()
})
