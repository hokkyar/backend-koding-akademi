const { xenditCallbackService } = require('./XenditCallbackServices')
const AuthorizationError = require('../../exceptions/AuthorizationError')

exports.xenditCallbackController = async (req, res) => {
  if (req.headers['x-callback-token'] !== process.env.XENDIT_CALLBACK_TOKEN) throw new AuthorizationError('Unauthorized')
  const order_id = await xenditCallbackService(req.body)
  res.status(201).json({
    status: 'success',
    order_id
  })
}
