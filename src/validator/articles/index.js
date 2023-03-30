const { ArticlesBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateArticlesBody = (body) => {
  const validationResult = ArticlesBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
