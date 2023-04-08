const { resetPasswordService } = require('./ResetPasswordServices')
const { validateResetPasswordBody } = require('../../../validator/reset-password')

exports.resetPassword = async (req, res) => {
  validateResetPasswordBody(req.body)
  const userId = req.user.id
  await resetPasswordService(req.body, userId)
  res.json({
    message: 'Reset password success'
  })
}