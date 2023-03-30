const Xendit = require('xendit-node')
const x = new Xendit({
  secretKey: process.env.XENDIT_TOKEN_SECRET,
})
const { Invoice } = x
const i = new Invoice({})

exports.getPayments = async (req, res) => {
  res.json({
    message: 'get payments'
  })
}

exports.getDetailPayment = async (req, res) => {
  res.json({
    message: 'get detail payments'
  })
}

exports.createInvoice = async (req, res) => {
  const { amount, payerEmail, description } = req.body

  const { invoice_url } = await i.createInvoice({
    externalID: 'INV-' + Date.now(),
    amount,
    payerEmail,
    description,
    shouldSendEmail: true,
  })

  res.json({
    message: invoice_url
  })
}

exports.xenditCallback = (req, res) => {
  // const { external_id, status, payment_method, payment_channel, amount, payer_email } = req.body
  // addSuccessCallback(external_id, status, payment_method, payment_channel, amount, payer_email)

  console.log(req.body)
  res.sendStatus(200)
}

exports.putPayment = async (req, res) => {
  res.json({
    message: 'put payments'
  })
}

exports.deletePayment = async (req, res) => {
  res.json({
    message: 'delete payments'
  })
} 
