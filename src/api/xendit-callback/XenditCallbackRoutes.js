const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { xenditCallbackController } = require('./XenditCallbackControllers')

router.post('/', asyncHandler(xenditCallbackController))
router.post('/pending', (req, res) => {
  console.log(req.body)
  res.sendStatus(201)
})

module.exports = router
