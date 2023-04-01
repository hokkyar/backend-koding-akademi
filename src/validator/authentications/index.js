const { PutAuthenticationSchema, DeleteAuthenticationSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validatePutAuthentication = (body) => {
  const validationResult = PutAuthenticationSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}

exports.validateDeleteAuthentication = (body) => {
  const validationResult = DeleteAuthenticationSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
