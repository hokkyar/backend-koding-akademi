const { registerService } = require('./RegisterServices')
const { validateRegister } = require('../../validator/register')

exports.userRegister = async (req, res) => {
  validateRegister(req.body)
  const { user_id, email_token } = await registerService(req.body)
  return res.status(201).json({
    status: 'success',
    message: 'User successfully registered',
    data: { user_id, email_token }
  })
}
