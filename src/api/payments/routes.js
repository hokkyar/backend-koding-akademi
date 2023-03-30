const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getPayments, getDetailPayment, postPayment, putPayment, deletePayment, xenditCallback } = require('./controllers')

router.get('/payments', asyncHandler(getPayments))
router.get('/payments/:id', asyncHandler(getDetailPayment))
router.post('/payments', asyncHandler(postPayment))
router.put('/payments/:id', asyncHandler(putPayment))
router.delete('/payments/:id', asyncHandler(deletePayment))
router.post('/xendit-callback', xenditCallback)

module.exports = router
