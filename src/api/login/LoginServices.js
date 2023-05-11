const { User, Student, AuthToken } = require('../../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const NotFoundError = require('../../exceptions/NotFoundError')
const InvariantError = require('../../exceptions/InvariantError')
const AuthenticationError = require('../../exceptions/AuthenticationError')

exports.userLoginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, role: 'user' }
  })
  if (!user) throw new NotFoundError('User not found')

  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) throw new InvariantError('Wrong password')

  if (!user.verified) throw new AuthenticationError(`Check your email inbox: (${email})`)

  const student = await Student.findOne({
    where: { user_id: user.id }
  })

  const accessToken = jwt.sign({ id: user.id, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED })
  const refreshToken = jwt.sign({ id: user.id, role: 'user' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED })

  await AuthToken.create({
    token: refreshToken
  })

  const response = {
    full_name: user.full_name,
    phone_number: student.phone_number,
    email,
    qr_code: user.qr_code,
    address: student.address,
    birth_date: student.birth_date,
    accessToken,
    refreshToken
  }

  return response
}
