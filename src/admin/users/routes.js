const router = require('express').Router()

const params = {
  page: 'users'
}

router.get('/users', (req, res) => {
  res.render('index', params)
})

module.exports = router
