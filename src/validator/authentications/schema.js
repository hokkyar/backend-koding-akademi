const Joi = require('joi')

exports.PostAuthenticationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

exports.PutAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})

exports.DeleteAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})
