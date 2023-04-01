const { RegisterSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateRegister = (body) => {
  const validationResult = RegisterSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
