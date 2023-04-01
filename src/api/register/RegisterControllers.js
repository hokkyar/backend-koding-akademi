const { registerService } = require('./RegisterServices')
const { validateUsersBody } = require('../../validator/users')

exports.userRegister = async (req, res) => {
  validateUsersBody(req.body)
  const id = await registerService(req.body)
  return res.json({
    message: 'Register success',
    id
  })
}
