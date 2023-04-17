const router = require('express').Router()

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/dashboard')
  } else {
    res.render('pages/login/page')
  }
})

router.post('/', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    req.session.user = { username: req.body.username }
    return res.redirect('/admin/dashboard')
  } else {
    return res.redirect('/admin/login')
  }
})

module.exports = router
