const router = require('express').Router()
const { verifyAdminLogin } = require('../middleware/verifyAdminLogin')

router.use('/articles', verifyAdminLogin, require('./articles/routes'))
router.use('/coupons', verifyAdminLogin, require('./coupons/routes'))
router.use('/courses', verifyAdminLogin, require('./courses/routes'))
router.use('/events', verifyAdminLogin, require('./events/routes'))
router.use('/qr-code', verifyAdminLogin, require('./qr-code/routes'))
router.use('/users', verifyAdminLogin, require('./users/routes'))
router.use('/dashboard', verifyAdminLogin, require('./dashboard/routes'))
router.use('/profile', verifyAdminLogin, require('./profile/routes'))
router.use('/faq', verifyAdminLogin, require('./faq/routes'))
router.use('/contact', verifyAdminLogin, require('./contact/routes'))

router.use('/login', require('./login/routes'))
router.use('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(204)
    return res.redirect('/admin/login')
  })
})

module.exports = router
