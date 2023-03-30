const { validatePostAuthentication, validatePutAuthentication, validateDeleteAuthentication } = require('../../validator/authentications')
const { loginUser, updateToken, deleteToken } = require('./services')

exports.postAuthentication = async (req, res) => {
  validatePostAuthentication(req.body)

  const { email, password } = req.body
  const { name, accessToken, refreshToken } = await loginUser(email, password)

  return res.status(201).json({
    message: 'Login success',
    name,
    accessToken,
    refreshToken
  })
}

exports.putAuthentication = async (req, res) => {
  validatePutAuthentication(req.body)
  const dummyUserId = 'user-8ZKQO8siJb'
  const { accessToken } = await updateToken(req.body, dummyUserId)

  return res.json({
    message: 'Token updated',
    accessToken
  })
}

exports.deleteAuthentication = async (req, res) => {
  validateDeleteAuthentication(req.body)
  deleteToken(req.body)

  return res.json({
    message: 'Token deleted'
  })
}
