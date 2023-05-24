const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { xenditCallbackController } = require('./XenditCallbackControllers')

router.post('/', asyncHandler(xenditCallbackController))

const getPayment = require('../../utils/getPayment')
router.get('/getAllInvoices', async (req, res) => {
  const data = await getPayment()
  res.json({
    data
  })
})

module.exports = router
