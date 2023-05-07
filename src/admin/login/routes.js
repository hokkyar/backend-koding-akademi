const router = require('express').Router()
const { Admin } = require('../../models/index')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/admin/dashboard')
  } else {
    return res.render('pages/login/page', { message: null })
  }
})

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const adminAccount = await Admin.findOne({ where: { username } })

  if (!adminAccount) return res.render('pages/login/page', { message: 'Invalid username or password' })

  const hashedPassword = adminAccount.password
  const isPasswordMatched = await bcrypt.compare(password, hashedPassword)

  if (!isPasswordMatched) return res.render('pages/login/page', { message: 'Invalid username or password' })

  req.session.user = { username }
  return res.redirect('/admin/dashboard')
})

module.exports = router
