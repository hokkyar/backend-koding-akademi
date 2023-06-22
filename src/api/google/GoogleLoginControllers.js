const { googleLoginService } = require('./GoogleLoginServices')

exports.googleLoginController = async (req, res) => {
  const { id, email, name } = req.body
  const data = await googleLoginService(id, email, name)
  res.json({
    status: 'success',
    message: 'Login success',
    data
  })
}