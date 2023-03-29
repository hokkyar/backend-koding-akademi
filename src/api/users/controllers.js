const { getUsersService, getDetailUserService, postUserService, putUserService, deleteUserService } = require('./services')

exports.getUsers = async (req, res) => {
  const users = await getUsersService()
  return res.json({
    message: 'get all users',
    users
  })
}

exports.getDetailUser = async (req, res) => {
  const { id } = req.params
  const user = await getDetailUserService(id)
  return res.json({
    message: 'get detail user',
    user
  })
}

exports.postUser = async (req, res) => {
  await postUserService(req.body)
  res.json({
    message: 'User berhasil ditambahkan'
  })
}

exports.putUser = async (req, res) => {
  const { id } = req.params
  await putUserService(id, req.body)
  res.json({
    message: 'User berhasil diedit'
  })
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  await deleteUserService(id)
  res.json({
    message: 'User berhasil dihapus'
  })
}