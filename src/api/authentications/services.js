const { User } = require('../../models/index')

exports.loginUser = async (email, password) => {
  const user = await User.findOne({
    where: { email }
  })
  return user.dataValues.id
}

exports.updateToken = async (refreshToken) => { }

exports.deleteToken = async (refreshToken) => { }
