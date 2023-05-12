const router = require('express').Router()
const session = require("express-session")

const { User } = require('../../models/index')

const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CALLBACK_URL = "http://localhost:3000/google/auth/callback"

router.use(passport.initialize())
router.use(passport.session())

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

// Deserialize user
passport.deserializeUser(async function (id, done) {
  await User.findByPk(id, function (err, user) {
    done(err, user);
  })
})

router.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
)

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
      // This function will be called after user successfully authenticated with Google OAuth
      // You can do anything here, like create a user account in your database
      // and set the user data in the session
      return cb(null, profile)
    }
  )
)

router.get('/', passport.authenticate("google", { scope: ["profile", "email"] }))
router.get('/callback', passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // This function will be called after user successfully authenticated with Google OAuth
    // You can redirect user to dashboard page or whatever you want to do
    res.redirect("/google/auth/googledata")
  }
)

router.get('/googledata', (req, res) => {
  res.json({ message: 'OK' })
})

module.exports = router
