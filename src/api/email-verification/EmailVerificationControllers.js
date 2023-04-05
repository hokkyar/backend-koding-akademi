const { emailVerificationService } = require('./EmailVerificationServices')
const { validateEmailVerification } = require('../../validator/email-verification')

exports.emailVerification = async (req, res) => {
  validateEmailVerification(req.query)
  await emailVerificationService(req.query)
  res.json({
    status: 'success',
    message: 'Account verified success'
  })
} 
