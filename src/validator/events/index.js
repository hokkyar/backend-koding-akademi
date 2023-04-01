const { EventsBodySchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

exports.validateEventsBody = (body) => {
  const validationResult = EventsBodySchema.validate(body)
  if (validationResult.error) throw new InvariantError(validationResult.error.message)
}
