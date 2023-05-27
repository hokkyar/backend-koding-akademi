const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const InvariantError = require('../../exceptions/InvariantError')
const { User } = require('../../models/index')
const bcrypt = require('bcryptjs')

const params = {
  page: 'profile',
  sub_page: 'page',
  title: 'Profile',
  sub: 'Profile',
  detail: null,
  data: null
}

router.get('/', (req, res) => res.render('index', params))
router.put('/', asyncHandler(async (req, res) => {
  const { password, newpassword, renewpassword } = req.body
  const user = await User.findOne({ where: { role: 'admin' } })
  const passwordMatched = await bcrypt.compare(password, user.password)
  if (!passwordMatched) {
    throw new InvariantError('Password salah')
  }
  if (newpassword !== renewpassword) {
    throw new InvariantError('New Password dan Re-New Password tidak sama')
  }
  await User.update({ password: bcrypt.hashSync(newpassword) }, { where: { role: 'admin' } })
  return res.sendStatus(200)
}))

module.exports = router
