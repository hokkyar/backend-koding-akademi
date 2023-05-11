const { nanoid } = require('nanoid')
const { User, AuthToken } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const sendEmailForgotPassword = require('../../../utils/sendEmailForgotPassword')

exports.resetPasswordService = async (id) => {
  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new NotFoundError('User not found')

  const userEmail = user.dataValues.email
  const token = `resetpassword-${nanoid(20)}`
  await AuthToken.create({ token })
  await sendEmailForgotPassword(userEmail, id, token)
}