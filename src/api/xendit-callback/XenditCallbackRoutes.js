const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { xenditCallbackController } = require('./XenditCallbackControllers')

router.post('/', asyncHandler(xenditCallbackController))

const getPayment = require('../../utils/getPayment')
router.get('/get/:invoiceID', async (req, res) => {
  const { invoice_url } = await getPayment(req.params.invoiceID)
  res.json({ invoice_url })
})

const cancelPayment = require('../../utils/cancelPayment')
router.delete('/cancel', async (req, res) => {
  await cancelPayment(req.body.invoiceID)
  res.json({ status: 'success' })
})

module.exports = router
