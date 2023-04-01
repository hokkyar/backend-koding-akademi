const { getUsersService, getDetailUserService, deleteUserService } = require('./UserServices')

exports.getUsers = async (req, res) => {
  const users = await getUsersService()
  res.json({
    message: 'Get all users',
    users
  })
}

exports.getDetailUser = async (req, res) => {
  const user = getDetailUserService(req.params.id)
  res.json({
    message: 'Get detail users',
    user
  })
}

exports.deleteUser = async (req, res) => {
  await deleteUserService(req.params.id)
  res.json({
    message: 'User deleted',
    id
  })
}