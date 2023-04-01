const AuthorizationError = require('../exceptions/AuthorizationError')

const verifyAdmin = (req, res, next) => {
  const role = req.user.role
  if (role !== 'admin') throw new AuthorizationError('Cannot access this resource')
  next()
}

module.exports = verifyAdmin