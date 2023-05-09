const Joi = require('joi')

exports.ValidateCheckoutBodySchema = Joi.object({
  productList: Joi.array().required()
})

