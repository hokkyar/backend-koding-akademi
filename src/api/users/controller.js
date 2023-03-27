const { User } = require('../../models/index')

exports.getUsers = async (req, res) => {
  const users = await User.findAll({})
  return res.json({
    message: 'get all users',
    users
  })
}