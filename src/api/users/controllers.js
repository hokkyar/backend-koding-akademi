const { User } = require('../../models/index')
const {nanoid} = require('nanoid')

exports.getUsers = async (req, res) => {
  const users = await User.findAll()
  return res.json({
    users
  })
}

exports.getDetailUser = async (req, res) => {
  const { id } = req.params
  const detailUser = await User.findOne({
    where: {
      id
    }
  })
  return res.json({
    message: 'get detail users',
    detailUser
  })
}

exports.postUser = async (req, res) => {
  const {email, password, name, verified, phone_number} = req.body
  const id = `user-${nanoid(16)}`
  await User.create({
    id, email, password, name, verified, phone_number
  })
  res.json({
    message: 'User berhasil ditambahkan'
  })
}

exports.putUser = async (req, res) => {
  const {email, password, name, verified, phone_number} = req.body
  const {id} = req.params
  await User.update({
    email, password, name, verified, phone_number
  },{
    where : {id}
  })
  res.json({
    message: 'User berhasil diedit'
  })
}

exports.deleteUser = async (req, res) => {
  const {id} = req.params
  await User.destroy({
    where : {id}
  })
  res.json({
    message: 'User berhasil dihapus'
  })
}