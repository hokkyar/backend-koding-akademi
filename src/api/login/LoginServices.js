const { User, AuthToken } = require('../../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const NotFoundError = require('../../exceptions/NotFoundError')
const InvariantError = require('../../exceptions/InvariantError')
const AuthenticationError = require('../../exceptions/AuthenticationError')

exports.userLoginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email }
  })
  if (!user) throw new NotFoundError('User not found')

  const isPasswordMatch = await bcrypt.compare(password, user.dataValues.password)
  if (!isPasswordMatch) throw new InvariantError('Wrong password')

  if (!user.dataValues.verified) throw new AuthenticationError(`Check your email inbox: (${email})`)

  const userId = user.dataValues.id
  const email = user.dataValues.email
  const full_name = user.dataValues.full_name

  const accessToken = jwt.sign({ id: userId, name: full_name, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED })
  const refreshToken = jwt.sign({ id: userId, name: full_name, role: 'user' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED })

  await AuthToken.create({
    token: refreshToken
  })

  return { full_name, email, accessToken, refreshToken }
}
