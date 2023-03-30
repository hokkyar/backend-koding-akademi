const { User, AuthToken } = require('../../models/index')

const jwt = require('jsonwebtoken')

const NotFoundError = require('../../exceptions/NotFoundError')
const InvariantError = require('../../exceptions/InvariantError')

exports.loginUser = async (email, password) => {
  const user = await User.findOne({
    where: { email }
  })

  if (!user) throw new NotFoundError('User not found')
  if (password !== user.dataValues.password) throw new InvariantError('Wrong password')

  const id = user.dataValues.id
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' })

  // selanjutnya simpan refreshToken di db
  await AuthToken.create({ token: refreshToken, user_id: id })

  // setelah itu tambahkan token di cookie atau session

  return { name: user.dataValues.name, accessToken, refreshToken }
}

exports.updateToken = async (refreshToken, id) => {
  const token = await AuthToken.findOne({
    where: {
      token: refreshToken
    }
  })

  if (!token) throw new NotFoundError('Token not found')

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
  return { accessToken }
}

exports.deleteToken = async (refreshToken) => {
  const token = await AuthToken.findOne({
    where: {
      token: refreshToken
    }
  })

  if (!token) throw new NotFoundError('Token not found')

  await AuthToken.destroy({
    where: {
      token: refreshToken
    }
  })
}
