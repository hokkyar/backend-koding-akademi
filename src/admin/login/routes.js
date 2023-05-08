const router = require('express').Router()
const { User } = require('../../models/index')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/admin/dashboard')
  } else {
    return res.render('pages/login/page', { message: null })
  }
})

router.post('/', async (req, res) => {
  const { email, password } = req.body
  const adminAccount = await User.findOne({ where: { email, role: 'admin' } })

  if (!adminAccount) return res.render('pages/login/page', { message: 'Invalid email or password' })

  const hashedPassword = adminAccount.password
  const isPasswordMatched = await bcrypt.compare(password, hashedPassword)

  if (!isPasswordMatched) return res.render('pages/login/page', { message: 'Invalid email or password' })

  req.session.user = { email }
  return res.redirect('/admin/dashboard')
})

module.exports = router
