const InvariantError = require('../../exceptions/InvariantError')
const asyncHandler = require('express-async-handler')

const {
  loginUser,
  updateToken,
  deleteToken
} = require('./services')

exports.postAuthentication = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body

  if (password !== confirmPassword) throw new InvariantError('password tidak sama')

  const { accessToken, refreshToken } = await loginUser(email, password)

  return res.status(201).json({
    message: 'Login Berhasil',
    accessToken,
    refreshToken
  })
})

exports.putAuthentication = async (req, res) => {
  const { refreshToken } = req.body
  await updateToken(refreshToken)

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

  return res.json({
    message: 'Token diupdate',
    accessToken
  })
}

exports.deleteAuthentication = async (req, res) => {
  const { refreshToken } = req.body
  deleteToken(refreshToken)
  return res.json({
    message: 'Token dihapus'
  })
}
