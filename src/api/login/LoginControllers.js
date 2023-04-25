const { userLoginService } = require('./LoginServices')
const { validateUserLogin } = require('../../validator/login')

exports.userLogin = async (req, res) => {
  validateUserLogin(req.body)
  const { full_name, email, accessToken, refreshToken } = await userLoginService(req.body)
  res.json({
    status: 'success',
    message: 'Login success',
    data: { full_name, email, accessToken, refreshToken },
  })
}
