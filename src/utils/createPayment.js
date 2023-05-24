require('dotenv').config()

const Xendit = require('xendit-node')
const x = new Xendit({
  secretKey: process.env.XENDIT_TOKEN_SECRET,
})
const { Invoice } = x
const i = new Invoice({})

const createPayment = async (orderId, amount, payerEmail, description) => {
  const data = await i.createInvoice({
    externalID: orderId,
    amount,
    payerEmail,
    description,
    shouldSendEmail: true
  })
  return data
}

module.exports = createPayment
