const Joi = require('joi')

exports.ValidateCheckoutBodySchema = Joi.object({
  productLists: Joi.array().required()
})

