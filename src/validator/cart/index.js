const { ValidateCartBodySchema, ValidateDeleteCartBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateCartBody = (body) => {
  const validationResult = ValidateCartBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}

exports.validateDeleteCartBody = (body) => {
  const validationResult = ValidateDeleteCartBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}