const { putAuthenticationService, deleteAuthenticationService } = require('./AuthenticationServices')

exports.putAuthentication = async (req, res) => {
  const accessToken = await putAuthenticationService(req.body)
  res.json({
    message: 'Access token updated',
    accessToken
  })
}

exports.deleteAuthentication = async (req, res) => {
  await deleteAuthenticationService(req.body)
  res.json({
    message: 'Access token deleted'
  })
}
