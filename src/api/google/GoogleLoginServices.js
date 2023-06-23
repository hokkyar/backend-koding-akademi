const { User, Cart, Student, AuthToken, sequelize } = require('../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { encryptData } = require('../../utils/encryptData')

exports.googleLoginService = async (userId, userEmail, userFullName) => {
  let response = {}
  let accessToken, refreshToken
  try {
    await sequelize.transaction(async (t) => {
      const [user, created] = await User.findOrCreate({
        where: { [Op.or]: [{ id: `user-${userId}` }, { email: userEmail }] },
        defaults: {
          id: 'user-' + userId,
          full_name: userFullName,
          email: userEmail,
          password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD_GOOGLE, 10),
          verified: true,
          role: 'user',
          qr_code: encryptData(`id=user-${userId}&tr=null`)
        },
        transaction: t
      })

      if (created) {
        const cartId = `cart-${nanoid(16)}`
        await Cart.create({ id: cartId, user_id: `user-${userId}` }, { transaction: t })
        await Student.create({ user_id: `user-${userId}`, phone_number: null, address: null, birth_date: null }, { transaction: t })

        accessToken = jwt.sign({ id: `user-${userId}`, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED })
        refreshToken = jwt.sign({ id: `user-${userId}`, role: 'user' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED })
      } else {
        if (!user.verified) {
          await User.update({ verified: true }, { where: { id: user.id } })
        }
        accessToken = jwt.sign({ id: user.id, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED })
        refreshToken = jwt.sign({ id: user.id, role: 'user' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED })
      }

      await AuthToken.create({ token: refreshToken })

      response = {
        email: userEmail,
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    console.log('An error occured: ', error)
  }

  return response
}