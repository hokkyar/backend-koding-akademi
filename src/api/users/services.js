const { User } = require('../../models/index')
const bcrypt = require('bcrypt')

exports.getUsersService = async () => {
  const users = await User.findAll()
  return users
}

exports.getDetailUserService = async (id) => {
  const user = await User.findOne({
    where: { id }
  })
  return user
}

exports.postUserService = async ({ email, password, name, phone_number }) => {
  const id = `user-${nanoid(16)}`
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  await User.create({
    id, email, password: hashedPassword, name, verified: false, phone_number
  })
}

exports.putUserService = async ({ email, password, name, phone_number }) => {
  await User.update({
    email, password, name, phone_number
  }, {
    where: { id }
  })
}

exports.deleteUserService = async (id) => {
  await User.destroy({
    where: { id }
  })
}