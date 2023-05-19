const { ValidateProfileBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateProfileBody = (body) => {
  const validationResult = ValidateProfileBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}