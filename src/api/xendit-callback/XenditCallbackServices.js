const { Order } = require('../../models/index')

exports.xenditCallbackService = async (external_id) => {
  await Order.update({ order_status: 'active' }, {
    where: { id: external_id }
  })
  // masukkan yang lainnya ke tabel transaksi / update ya??
}