const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const passport = require('passport')

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, cb) => {
  cb(null, user);
})
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
})

const { successGoogleLogin } = require('./GoogleLoginControllers')
router.get('/success', asyncHandler(successGoogleLogin))
router.get('/error', (req, res) => res.status(500).send("An Error Occured"))
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/callback', passport.authenticate('google', { failureRedirect: '/error' }), (req, res) => {
  res.redirect('/auth/google/success')
})

module.exports = router
