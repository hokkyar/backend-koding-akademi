const { User, AuthToken } = require('../../models/index')
const sendEmailVerification = require('../../utils/sendEmailVerification')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const ConflictError = require('../../exceptions/ConflictError')

exports.registerService = async ({ email, password, full_name, phone_number }) => {
  const user = await User.findOne({
    where: {
      email
    }
  })

  if (user) throw new ConflictError('Email already exists')

  const user_id = `user-${nanoid(16)}`
  const hashedPassword = await bcrypt.hash(password, 10)
  await User.create({
    id: user_id, email, password: hashedPassword, verified: false, full_name, phone_number
  })

  const email_token = `verify-${nanoid(8)}`
  await AuthToken.create({ token: email_token })
  await sendEmailVerification(email, user_id, email_token)

  return { user_id, email_token }
}