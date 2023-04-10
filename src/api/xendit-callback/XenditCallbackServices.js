const { Order, OrderItem, Transaction, Product } = require('../../models/index')
const moment = require('moment')

exports.xenditCallbackService = async ({ external_id, payment_method, status, amount, paid_at, bank_code }) => {
  await Order.update({ order_status: 'active' }, {
    where: { id: external_id }
  })

  await Transaction.create({
    order_id: external_id, payment_method, payment_status: status, amount, date: paid_at, bank_name: bank_code
  })

  await OrderItem.update({ status: 'active' }, {
    where: { order_id: external_id }
  })

  const orderItem = await OrderItem.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'duration']
      }
    ],
    where: { order_id: external_id }
  })

  for (let i = 0; i < orderItem.length; i++) {
    const purchase_date = moment(paid_at)
    const course_duration = orderItem[i].dataValues.Product.duration;
    const expired_date = purchase_date.add(course_duration, 'months').format('YYYY-MM-DD')
    await OrderItem.update({ expired_date }, {
      where: { product_id: orderItem[i].dataValues.Product.id }
    })
  }

  return external_id
}
