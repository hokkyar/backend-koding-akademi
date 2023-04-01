const { AuthToken, User } = require('../../models/index')
const NotFoundError = require('../../exceptions/NotFoundError')

exports.emailVerificationService = async (id, email_token) => {
  const token = await AuthToken.findOne({
    where: { token: email_token }
  })
  if (!token) throw new NotFoundError('Invalid token')

  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new NotFoundError('Invalid user id')

  await AuthToken.destroy({
    where: { token: email_token }
  })
  await User.update({ verified: true }, {
    where: { id }
  })
}