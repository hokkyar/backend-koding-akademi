const { ValidateCheckoutBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateCheckoutBody = (body) => {
  const validationResult = ValidateCheckoutBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}