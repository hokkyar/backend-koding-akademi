const { User } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getUsersService = async () => {
  const users = await User.findAll()
  return users
}

exports.getDetailUserService = async (id) => {
  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new NotFoundError('User not found')
  return user
}

exports.deleteUserService = async (id) => {
  const user = await User.findOne({
    where: { id }
  })
  if (!user) throw new NotFoundError('User not found')
  await User.destroy({
    where: { id }
  })
}