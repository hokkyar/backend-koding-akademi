const Xendit = require('xendit-node')
const x = new Xendit({
  secretKey: process.env.XENDIT_TOKEN_SECRET,
})
const { Invoice } = x
const i = new Invoice({})

const createPayment = async (amount, payerEmail, description) => {
  const { invoice_url } = await i.createInvoice({
    externalID: 'INV-' + Date.now(),
    amount,
    payerEmail,
    description,
    shouldSendEmail: true,
  })
  return invoice_url
}

module.exports = createPayment
