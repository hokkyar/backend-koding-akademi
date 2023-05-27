const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { xenditCallbackController } = require('./XenditCallbackControllers')

router.post('/', asyncHandler(xenditCallbackController))

const getPayment = require('../../utils/getPayment')
router.get('/get/:invoiceID', async (req, res) => {
  try {
    const { invoice_url } = await getPayment(req.params.invoiceID)
    res.json({ invoice_url })
  } catch (error) {
    console.log('An Error occured')
    res.sendStatus(500)
  }
})

const cancelPayment = require('../../utils/cancelPayment')
router.delete('/cancel/:invoiceID', async (req, res) => {
  try {
    await cancelPayment(req.params.invoiceID)
    res.json({ status: 'invoice canceled' })
  } catch (error) {
    console.log('An Error occured')
    res.sendStatus(500)
  }
})

module.exports = router
