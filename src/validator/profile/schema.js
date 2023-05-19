const Joi = require('joi')

exports.ValidateProfileBodySchema = Joi.object({
  full_name: Joi.string(),
  phone_number: Joi.string().allow(null).allow('').pattern(/^\d+$/),
  address: Joi.string().allow(null).allow(''),
  birth_date: Joi.string().allow(null).allow('')
})

