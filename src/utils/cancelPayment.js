require('dotenv').config()

const Xendit = require('xendit-node')
const x = new Xendit({
  secretKey: process.env.XENDIT_TOKEN_SECRET,
})
const { Invoice } = x
const i = new Invoice({})

const cancelPayment = async (invoiceID) => {
  await i.expireInvoice({ invoiceID })
}

module.exports = cancelPayment
