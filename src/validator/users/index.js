const { UsersBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateUsersBody = (body) => {
  const validationResult = UsersBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
