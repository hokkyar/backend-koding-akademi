const { User } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const InvariantError = require('../../../exceptions/InvariantError')
const bcrypt = require('bcrypt')

exports.resetPasswordService = async ({ oldPassword, newPassword }, userId) => {
  const user = await User.findOne({
    where: { id: userId }
  })
  if (!user) throw new NotFoundError('User not found')

  const userPassword = user.dataValues.password
  const isMatch = await bcrypt.compare(oldPassword, userPassword)

  if (!isMatch) throw new InvariantError('Invalid old password')

  const hashedNewPassword = await bcrypt.hash(newPassword, 10)
  await User.update({
    password: hashedNewPassword
  }, {
    where: { id: userId }
  })
}