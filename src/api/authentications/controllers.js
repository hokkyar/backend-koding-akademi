const { validatePostAuthentication, validatePutAuthentication, validateDeleteAuthentication } = require('../../validator/authentications')
const { loginUser, updateToken, deleteToken } = require('./services')

exports.postAuthentication = async (req, res) => {
  validatePostAuthentication(req.body)

  const { email, password } = req.body
  const { accessToken, refreshToken } = await loginUser(email, password)

  return res.status(201).json({
    message: 'Login Berhasil',
    accessToken,
    refreshToken
  })
}

exports.putAuthentication = async (req, res) => {
  validatePutAuthentication(req.body)

  await updateToken(req.body)
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

  return res.json({
    message: 'Token diupdate',
    accessToken
  })
}

exports.deleteAuthentication = async (req, res) => {
  validateDeleteAuthentication(req.body)

  deleteToken(req.body)

  return res.json({
    message: 'Token dihapus'
  })
}
