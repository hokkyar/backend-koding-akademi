const { getUsersService, getDetailUserService, deleteUserService } = require('./UserServices')

exports.getUsers = async () => {
  const users = await getUsersService()
  res.json({
    message: 'Get all users',
    users
  })
}

exports.getDetailUser = async (id) => {
  const user = getDetailUserService(id)
  res.json({
    message: 'Get detail users',
    user
  })
}

exports.deleteUser = async (id) => {
  await deleteUserService(id)
  res.json({
    message: 'User deleted',
    id
  })
}