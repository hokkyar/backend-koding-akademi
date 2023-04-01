const { userLoginService, adminLoginService } = require('./LoginServices')
const { validateAdminLogin, validateUserLogin } = require('../../validator/login')

exports.adminLogin = async (req, res) => {
  validateAdminLogin(req.body)
  const { accessToken, refreshToken } = await adminLoginService(req.body)
  res.json({
    message: 'Login success',
    accessToken,
    refreshToken
  })
}

exports.userLogin = async (req, res) => {
  validateUserLogin(req.body)
  const { accessToken, refreshToken } = await userLoginService(req.body)
  res.json({
    message: 'Login success',
    accessToken,
    refreshToken
  })
}
