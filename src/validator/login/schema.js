const Joi = require('joi')

exports.AdminLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

exports.UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
