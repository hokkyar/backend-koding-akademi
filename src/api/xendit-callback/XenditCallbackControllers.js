const { xenditCallbackService } = require('./XenditCallbackServices')

exports.xenditCallbackController = async (req, res) => {
  const order_id = await xenditCallbackService(req.body)
  res.status(201).json({
    status: 'success',
    order_id
  })
}

/* RESPONSE CALLBACKNYA
    {
      id: '579c8d61f23fa4ca35e52da4',
      external_id: 'invoice_123124123',
      user_id: '5781d19b2e2385880609791c',
      is_high: true,
      payment_method: 'BANK_TRANSFER',
      status: 'PAID',
      merchant_name: 'Xendit',
      amount: 50000,
      paid_amount: 50000,
      bank_code: 'PERMATA',
      paid_at: '2016-10-12T08:15:03.404Z',
      payer_email: 'wildan@xendit.co',
      description: 'This is a description',
      adjusted_received_amount: 47500,
      fees_paid_amount: 0,
      updated: '2016-10-10T08:15:03.404Z',
      created: '2016-10-10T08:15:03.404Z',
      currency: 'IDR',
      payment_channel: 'PERMATA',
      payment_destination: '888888888888'
    }
  */

/* YANG DIMASUKIN KE TABEL TRANSAKSI
external_id --> order_id
payment_method --> payment_method
status --> payment_status
amount --> amount
paid_at --> date
bank_code --> bank_name
??? --> account_number
*/