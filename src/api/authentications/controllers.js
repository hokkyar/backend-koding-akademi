const { loginUser, updateToken, deleteToken } = require('./services')
const jwt = require('jsonwebtoken')

exports.postAuthentication = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body

  if (password !== confirmPassword) return res.status(400).json({ message: 'password salah' })

  const id = await loginUser(email, password)

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' })

  res.status(201).json({
    message: 'Login Berhasil',
    accessToken,
    refreshToken
  })
}

exports.putAuthentication = async (req, res) => {
  const { refreshToken } = req.body
  await updateToken(refreshToken)

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

  res.json({
    message: 'Token diupdate',
    accessToken
  })
}

exports.deleteAuthentication = async (req, res) => {
  const { refreshToken } = req.body
  deleteToken(refreshToken)
  res.json({
    message: 'Token dihapus'
  })
}
