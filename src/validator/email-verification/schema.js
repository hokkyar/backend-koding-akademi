const Joi = require('joi')

exports.EmailVerificationSchema = Joi.object({
  id: Joi.string().required(),
  email_token: Joi.string().required()
})
