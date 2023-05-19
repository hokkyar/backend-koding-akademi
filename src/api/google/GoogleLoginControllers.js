const { getGoogleAccount } = require('./GoogleLoginServices')

exports.successGoogleLogin = async (req, res) => {
  const data = await getGoogleAccount()
  res.json({
    status: 'success',
    message: 'Login success',
    data
  })
}