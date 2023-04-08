const { ResetPasswordSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateResetPasswordBody = (body) => {
  const validationResult = ResetPasswordSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
