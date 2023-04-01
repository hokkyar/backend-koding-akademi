const { EmailVerificationSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateEmailVerification = (query) => {
  const validationResult = EmailVerificationSchema.validate(query)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
