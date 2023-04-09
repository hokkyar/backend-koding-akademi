const { Order, Transaction } = require('../../models/index')

exports.xenditCallbackService = async ({ external_id, payment_method, status, amount, paid_at, bank_code }) => {
  await Order.update({ order_status: 'active' }, {
    where: { id: external_id }
  })
  // masukkan yang lainnya ke tabel transaksi / update ???
  await Transaction.create({
    order_id: external_id, payment_method, payment_status: status, amount, date: paid_at, bank_name: bank_code
  })
  return external_id
}
