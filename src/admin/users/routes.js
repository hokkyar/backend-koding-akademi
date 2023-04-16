const router = require('express').Router()

router.get('/users', (req, res) => {
  res.render('pages/users/page')
})

module.exports = router
