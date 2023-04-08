const Joi = require('joi')

exports.ValidateCartBodySchema = Joi.object({
  productId: Joi.string().required()
})

exports.ValidateDeleteCartBodySchema = Joi.object({
  productLists: Joi.array().required()
})

