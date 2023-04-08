const Joi = require('joi')

exports.ResetPasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/).messages({
    'string.pattern.base': 'Password must contain at least one letter, one number, and one symbol',
  }),
  confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Password do not match'
  })
})
