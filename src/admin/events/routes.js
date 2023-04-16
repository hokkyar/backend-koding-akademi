const router = require('express').Router()

router.get('/events', (req, res) => {
  res.render('pages/events/page')
})

module.exports = router
