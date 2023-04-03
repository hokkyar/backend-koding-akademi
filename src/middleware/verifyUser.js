const AuthorizationError = require('../exceptions/AuthorizationError')

const verifyUser = (req, res, next) => {
  const role = req.user.role
  if (role !== 'user') throw new AuthorizationError('Cannot access this resource')
  next()
}

module.exports = verifyUser