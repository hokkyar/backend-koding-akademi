const { emailVerificationService } = require('./EmailVerificationServices')

exports.emailVerification = async (req, res) => {
  const { id, email_token } = req.query
  await emailVerificationService(id, email_token)
  res.json({
    message: 'Account verified success'
  })
} 
