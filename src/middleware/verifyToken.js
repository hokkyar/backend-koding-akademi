const jwt = require('jsonwebtoken')
const AuthenticationError = require('../exceptions/AuthenticationError')
const AuthorizationError = require('../exceptions/AuthorizationError')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new AuthenticationError('Requires credentials')
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decodedToken
    next()
  } catch (err) {
    throw new AuthorizationError('Invalid token')
  }
}

module.exports = verifyToken
