const { forgotPasswordService, confirmForgotPasswordService, verifyForgotPasswordService } = require('./ForgotPasswordServices')
const { validateForgotPasswordBody, validateVerifyForgotPasswordBody } = require('../../validator/forgot-password')
const NotFoundError = require('../../exceptions/NotFoundError')

exports.forgotPassword = async (req, res) => {
  validateForgotPasswordBody(req.body)
  await forgotPasswordService(req.body)
  res.status(201).json({
    status: 'success',
    message: 'Check your email address'
  })
}

exports.confirmForgotPassword = async (req, res) => {
  const { token, id } = req.query
  if (!token || !id) throw new NotFoundError(`Page not found`)
  await confirmForgotPasswordService(token, id)
  res.render('forgotPasswordPages')
}

exports.verifyForgotPassword = async (req, res) => {
  validateVerifyForgotPasswordBody(req.body)
  await verifyForgotPasswordService(req.body)
  res.json({
    message: 'Your password has been updated'
  })
}

exports.redirectPage = async (req, res) => {
  res.render('forgotPasswordSuccessPage')
}
