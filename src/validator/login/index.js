const { AdminLoginSchema, UserLoginSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateAdminLogin = (body) => {
  const validationResult = AdminLoginSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}

exports.validateUserLogin = (body) => {
  const validationResult = UserLoginSchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
