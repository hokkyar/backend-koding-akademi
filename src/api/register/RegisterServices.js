const { User, AuthToken, Cart, Student, sequelize } = require('../../models/index')
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
  const email_token = `verify-${nanoid(8)}`
  const cartId = `cart-${nanoid(16)}`

  try {
    await sequelize.transaction(async (t) => {
      await User.create({
        id: user_id, role: 'user', qr_code: `id=${user_id}&pc=0`, email, password: hashedPassword, verified: false, full_name, phone_number
      }, { transaction: t })
      await AuthToken.create({ token: email_token }, { transaction: t })
      await sendEmailVerification(email, user_id, email_token)
      await Cart.create({ id: cartId, user_id }, { transaction: t })
      await Student.create({ user_id, phone_number, address: null, birth_date: null }, { transaction: t })
    })
  } catch (error) {
    console.log('An error occured: ', error)
  }

  return { user_id, email_token }
}