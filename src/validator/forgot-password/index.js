const { ForgotPasswordSchema, UpdatePasswordSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateForgotPasswordBody = (body) => {
  const validationResult = ForgotPasswordSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}

exports.validateUpdatePasswordBody = (body) => {
  const validationResult = UpdatePasswordSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
