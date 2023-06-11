require('dotenv').config()

const Xendit = require('xendit-node')
const x = new Xendit({
  secretKey: process.env.XENDIT_TOKEN_SECRET,
})
const { Invoice } = x
const i = new Invoice({})

const createPayment = async (orderId, amount, payerName, payerPhone, payerEmail, description) => {
  const data = {
    externalID: orderId,
    amount,
    payerEmail,
    description,
    shouldSendEmail: true,
    customer: {
      given_names: payerName,
      email: payerEmail
    }
  }

  if (payerPhone) {
    data.customer.mobile_number = payerPhone
  }

  const xenditResponse = await i.createInvoice(data)
  return xenditResponse
}

module.exports = createPayment
