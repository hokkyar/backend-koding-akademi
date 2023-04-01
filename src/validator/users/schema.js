const Joi = require('joi')

exports.UsersBodySchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/).messages({
    'string.pattern.base': 'Password must contain at least one letter, one number, and one symbol',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Password do not match'
  }),
  name: Joi.string().required(),
  phone_number: Joi.string().allow(null)
})
