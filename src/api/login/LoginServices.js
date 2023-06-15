const { User, AuthToken } = require('../../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../exceptions/NotFoundError')
const InvariantError = require('../../exceptions/InvariantError')
const AuthenticationError = require('../../exceptions/AuthenticationError')
const sendEmailVerification = require('../../utils/sendEmailVerification')

exports.userLoginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, role: 'user' }
  })
  if (!user) throw new NotFoundError('User not found')

  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) throw new InvariantError('Wrong password')

  if (!user.verified) {
    const token = `verify-${nanoid(8)}`
    await AuthToken.create({ token })
    await sendEmailVerification(email, user.id, token)
    throw new AuthenticationError(`This account hasn't been verified. Check your inbox at (${email})`)
  }

  const accessToken = jwt.sign({ id: user.id, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED })
  const refreshToken = jwt.sign({ id: user.id, role: 'user' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED })

  await AuthToken.create({ token: refreshToken })

  return {
    accessToken,
    refreshToken
  }
}
