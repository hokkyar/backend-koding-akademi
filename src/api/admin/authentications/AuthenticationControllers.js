const { putAuthenticationService, deleteAuthenticationService } = require('./AuthenticationServices')
const { validatePutAuthentication, validateDeleteAuthentication } = require('../../../validator/authentications')

exports.putAuthentication = async (req, res) => {
  validatePutAuthentication(req.body)
  const accessToken = await putAuthenticationService(req.body)
  res.json({
    message: 'Access token updated',
    accessToken
  })
}

exports.deleteAuthentication = async (req, res) => {
  validateDeleteAuthentication(req.body)
  await deleteAuthenticationService(req.body)
  res.json({
    message: 'Access token deleted'
  })
}
