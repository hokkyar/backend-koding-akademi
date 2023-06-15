const { User, AuthToken, Cart, Student } = require('../../models/index')
const sendEmailVerification = require('../../utils/sendEmailVerification')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const ConflictError = require('../../exceptions/ConflictError')
const { encryptData } = require('../../utils/encryptData')

exports.registerService = async ({ email, password, full_name, phone_number }) => {
  const user = await User.findOne({
    where: {
      email
    }
  })

  if (user) throw new ConflictError('Email already exists')

  const user_id = `user-${nanoid(16)}`
  const hashedPassword = bcrypt.hashSync(password, 10)
  const qr_code = encryptData(`id=${user_id}&tr=null`)

  const email_token = `verify-${nanoid(8)}`
  const cartId = `cart-${nanoid(16)}`

  await User.create({
    id: user_id, role: 'user', qr_code, email, password: hashedPassword, verified: false, full_name, phone_number
  })
  await Cart.create({ id: cartId, user_id })
  await Student.create({ user_id, phone_number, address: null, birth_date: null })
  await AuthToken.create({ token: email_token })

  await sendEmailVerification(email, user_id, email_token)

  return { user_id, email_token }
}