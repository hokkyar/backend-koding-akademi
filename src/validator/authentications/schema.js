const Joi = require('joi')

exports.PutAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})

exports.DeleteAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})
