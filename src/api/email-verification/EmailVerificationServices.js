const { AuthToken, User } = require('../../models/index')
const InvariantError = require('../../exceptions/InvariantError')

exports.emailVerificationService = async ({ id, email_token }) => {
  const token = await AuthToken.findOne({
    where: { token: email_token }
  })
  if (!token) throw new InvariantError('Invalid token')

  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new InvariantError('Invalid user id')

  await User.update({ verified: true }, {
    where: { id }
  })
  await AuthToken.destroy({
    where: { token: email_token }
  })
}
