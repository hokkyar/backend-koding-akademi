const { resetPasswordService } = require('./ResetPasswordServices')

exports.resetPassword = async (req, res) => {
  const userId = req.user.id
  await resetPasswordService(userId)
  res.json({
    message: 'Reset password success'
  })
}