const { nanoid } = require('nanoid')
const sendEmailVerification = require('../../utils/sendEmailVerification')
const { registerService } = require('./RegisterServices')
const { validateRegister } = require('../../validator/register')

exports.userRegister = async (req, res) => {
  validateRegister(req.body)

  const user_id = `user-${nanoid(16)}`
  const token = `verify-${nanoid(8)}`

  await registerService(req.body, user_id, token)
  await sendEmailVerification(req.body.email, user_id, token)

  return res.status(201).json({
    status: 'success',
    message: 'Register success',
    data: { user_id }
  })
}
