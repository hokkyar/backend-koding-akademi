const { nanoid } = require('nanoid')
const { User, AuthToken } = require('../../models/index')
const NotFoundError = require('../../exceptions/NotFoundError')
const sendEmailForgotPassword = require('../../utils/sendEmailForgotPassword')
const bcrypt = require('bcrypt')

exports.forgotPasswordService = async ({ email }) => {
  const user = await User.findOne({
    where: { email }
  })
  if (!user) throw new NotFoundError('Invalid email address')
  const userId = user.dataValues.id
  const token = `forgotpassword-${nanoid(20)}`
  await AuthToken.create({ token })
  // await sendEmailForgotPassword(email, userId, token)
  console.log(`${process.env.HOST}/forgot-password?token=${token}&id=${userId}`)
}

exports.confirmForgotPasswordService = async (token, id) => {
  const data = await AuthToken.findOne({
    where: { token }
  })
  if (!data) throw new NotFoundError('Invalid token')

  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new NotFoundError('Invalid user')
}

exports.verifyForgotPasswordService = async ({ password, userId, token }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  await User.update({
    password: hashedPassword
  }, {
    where: {
      id: userId
    }
  })
  await AuthToken.destroy({
    where: { token }
  })
}
