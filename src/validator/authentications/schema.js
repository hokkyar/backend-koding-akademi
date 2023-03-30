const Joi = require('joi')

exports.PostAuthenticationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Password do not match'
  })
})

exports.PutAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})

exports.DeleteAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})
