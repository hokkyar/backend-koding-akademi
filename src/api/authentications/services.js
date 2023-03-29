const { User } = require('../../models/index')
const jwt = require('jsonwebtoken')

exports.loginUser = async (email, password) => {
  const user = await User.findOne({
    where: { email }
  })
  const id = user.dataValues.id
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' })
  return { accessToken, refreshToken }
}

exports.updateToken = async (refreshToken) => { }

exports.deleteToken = async (refreshToken) => { }
