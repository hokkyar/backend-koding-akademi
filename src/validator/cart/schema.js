const Joi = require('joi')

exports.ValidateCartBodySchema = Joi.object({
  productId: Joi.string().required(),
  selectedDate: Joi.date().allow(null)
})

exports.ValidateDeleteCartBodySchema = Joi.object({
  productLists: Joi.array().required()
})

