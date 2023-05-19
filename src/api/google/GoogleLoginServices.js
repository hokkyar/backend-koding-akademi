const passport = require('passport')
const { User, Cart, Student, sequelize } = require('../../models/index')
const { nanoid } = require('nanoid')

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
        where: { id: `user-${userProfile.id}` },
        defaults: {
          id: 'user-' + userProfile.id,
          full_name: userProfile.displayName,
          email: userProfile.emails[0].value,
          password: 'google-auth-asd',
          verified: true,
          role: 'user',
          qr_code: `id=user-${userProfile.id}&pc=0`
        },
        transaction: t
      })

      if (created) {
        const cartId = `cart-${nanoid(16)}`
        await Cart.create({ id: cartId, user_id: `user-${userProfile.id}` }, { transaction: t })
        await Student.create({ user_id: `user-${userProfile.id}`, phone_number: null, address: null, birth_date: null }, { transaction: t })
      }

      responseData = {
        full_name: user.full_name,
        email: user.email,
        qr_code: user.qr_code,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      }

    })
  } catch (error) {
    console.log('An error occured: ', error)
  }
  return responseData
}