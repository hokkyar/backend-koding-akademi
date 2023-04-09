const { forgotPasswordService, resetPassswordPageService, updatePasswordService } = require('./ForgotPasswordServices')
const { validateForgotPasswordBody, validateUpdatePasswordBody } = require('../../validator/forgot-password')
const NotFoundError = require('../../exceptions/NotFoundError')

exports.forgotPassword = async (req, res) => {
  validateForgotPasswordBody(req.body)
  await forgotPasswordService(req.body)
  res.status(201).json({
    status: 'success',
    message: 'Check your email address'
  })
}

exports.resetPassswordPage = async (req, res) => {
  const { token, id } = req.query
  if (!token || !id) throw new NotFoundError(`Page not found`)
  await resetPassswordPageService(token, id)
  res.render('forgotPasswordPages')
}

exports.updatePassword = async (req, res) => {
  validateUpdatePasswordBody(req.body)
  await updatePasswordService(req.body)
  res.json({
    message: 'Your password has been updated'
  })
}

exports.redirectPage = async (req, res) => {
  res.render('forgotPasswordSuccessPage')
}
