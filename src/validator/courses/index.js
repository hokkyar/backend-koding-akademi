const { CoursesBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateCoursesBody = (body) => {
  const validationResult = CoursesBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
