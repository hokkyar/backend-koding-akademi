const { nanoid } = require('nanoid')
const { User } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const sendEmailForgotPassword = require('../../../utils/sendEmailForgotPassword')

// exports.resetPasswordService = async ({ oldPassword, newPassword }, userId) => {
//   const user = await User.findOne({
//     where: { id: userId }
//   })
//   if (!user) throw new NotFoundError('User not found')

//   const userPassword = user.dataValues.password
//   const isMatch = await bcrypt.compare(oldPassword, userPassword)

//   if (!isMatch) throw new InvariantError('Invalid old password')
//   const hashedNewPassword = await bcrypt.hash(newPassword, 10)

//   const isEqual = await bcrypt.compare(oldPassword, hashedNewPassword)
//   if (isEqual) throw new ConflictError('New password cannot be the same as the current one')

//   await User.update({
//     password: hashedNewPassword
//   }, {
//     where: { id: userId }
//   })
// }

exports.resetPasswordService = async (id) => {
  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new NotFoundError('User not found')

  const userEmail = user.dataValues.email
  const token = `resetpassword-${nanoid(20)}`
  await AuthToken.create({ token })
  await sendEmailForgotPassword(userEmail, id, token)
  // console.log(`${process.env}/forgot-password?token=${token}&id=${id}`)
}