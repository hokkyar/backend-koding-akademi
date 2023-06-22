const { userLoginService } = require('./LoginServices')
const { validateUserLogin } = require('../../validator/login')

exports.userLogin = async (req, res) => {
  validateUserLogin(req.body)
  const response = await userLoginService(req.body)
  res.json({
    status: 'success',
    message: 'Login success',
    data: {
      email: req.body.email,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    },
  })
}
