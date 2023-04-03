const { User, AuthToken } = require('../../models/index')
const sendEmailVerification = require('../../utils/sendEmailVerification')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const ConflictError = require('../../exceptions/ConflictError')
const AuthenticationError = require('../../exceptions/AuthenticationError')

exports.registerService = async ({ email, password, full_name, phone_number }) => {
  const user = await User.findOne({
    where: {
      email
    }
  })

  if (user) throw new ConflictError('Email already exists')
  // if (user && !user.dataValues.verified) throw new AuthenticationError(`Check your email inbox: (${email})`)

  const id = `user-${nanoid(16)}`
  const hashedPassword = await bcrypt.hash(password, 10)
  await User.create({
    id, email, password: hashedPassword, verified: false, full_name, phone_number
  })

  const email_token = `verify-${nanoid(8)}`
  await AuthToken.create({ token: email_token })
  await sendEmailVerification(email, id, email_token)

  return id
}