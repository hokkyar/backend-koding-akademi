const { userLoginService } = require('./LoginServices')
const { validateUserLogin } = require('../../validator/login')

exports.userLogin = async (req, res) => {
  validateUserLogin(req.body)
  const response = await userLoginService(req.body)
  res.json({
    status: 'success',
    message: 'Login success',
    data: {
      full_name: response.full_name,
      phone_number: response.phone_number,
      email: response.email,
      qr_code: response.qr_code,
      address: response.address,
      birth_date: response.birth_date,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    },
  })
}
