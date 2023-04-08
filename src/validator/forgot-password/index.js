const { ForgotPasswordSchema, VerifyForgotPasswordSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateForgotPasswordBody = (body) => {
  const validationResult = ForgotPasswordSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}

exports.validateVerifyForgotPasswordBody = (body) => {
  const validationResult = VerifyForgotPasswordSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
