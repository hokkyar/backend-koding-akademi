const jwt = require('jsonwebtoken')
const NotFoundError = require('../exceptions/NotFoundError')
const AuthorizationError = require('../exceptions/AuthorizationError')

const authUserToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) throw new NotFoundError('Token not found')

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decodedToken
    next()
  } catch (err) {
    throw new AuthorizationError('Invalid token')
  }
}

module.exports = authUserToken