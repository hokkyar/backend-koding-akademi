const { userLoginService, adminLoginService } = require('./LoginServices')
const { validatePostAuthentication } = require('../../validator/authentications')

exports.adminLogin = async (req, res) => {
  // validatePostAuthentication(req.body)
  const { accessToken, refreshToken } = await adminLoginService(req.body)
  res.json({
    message: 'Login success',
    accessToken,
    refreshToken
  })
}

exports.userLogin = async (req, res) => {
  validatePostAuthentication(req.body)
  const { accessToken, refreshToken } = await userLoginService(req.body)
  res.json({
    message: 'Login success',
    accessToken,
    refreshToken
  })
}
