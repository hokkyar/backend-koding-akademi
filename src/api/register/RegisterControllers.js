const { registerService } = require('./RegisterServices')
const { validateRegister } = require('../../validator/register')

exports.userRegister = async (req, res) => {
  validateRegister(req.body)
  const id = await registerService(req.body)
  return res.json({
    message: 'Register success',
    id
  })
}
