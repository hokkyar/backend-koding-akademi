const passport = require('passport')
const { User, Cart, Student, sequelize } = require('../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { encryptData } = require('../../utils/encryptData')

let userProfile
const GoogleStrategy = require('passport-google-oauth20').Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.HOST}/auth/google/callback`
},
  (accessToken, refreshToken, profile, done) => {
    userProfile = profile
    return done(null, userProfile)
  }
))

exports.getGoogleAccount = async () => {
  let responseData = {}
  try {
    await sequelize.transaction(async (t) => {
      const [user, created] = await User.findOrCreate({
        where: { [Op.or]: [{ id: `user-${userProfile.id}` }, { email: userProfile.emails[0].value }] },
        defaults: {
          id: 'user-' + userProfile.id,
          full_name: userProfile.displayName,
          email: userProfile.emails[0].value,
          password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD_GOOGLE, 10),
          verified: true,
          role: 'user',
          qr_code: encryptData(`id=user-${userProfile.id}&tr=null`)
        },
        transaction: t
      })

      if (created) {
        const cartId = `cart-${nanoid(16)}`
        await Cart.create({ id: cartId, user_id: `user-${userProfile.id}` }, { transaction: t })
        await Student.create({ user_id: `user-${userProfile.id}`, phone_number: null, address: null, birth_date: null }, { transaction: t })
      }

      const accessToken = jwt.sign({ id: `user-${userProfile.id}`, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED })
      const refreshToken = jwt.sign({ id: `user-${userProfile.id}`, role: 'user' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRED })

      responseData = {
        full_name: user.full_name,
        email: user.email,
        qr_code: user.qr_code,
        accessToken: accessToken,
        refreshToken: refreshToken
      }

    })
  } catch (error) {
    console.log('An error occured: ', error)
  }
  return responseData
}