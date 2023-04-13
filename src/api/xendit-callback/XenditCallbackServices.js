const { Order, OrderItem, Transaction, Product, User, UserProduct } = require('../../models/index')
const moment = require('moment')

exports.xenditCallbackService = async ({ external_id, payment_method, status, amount, paid_at, bank_code }) => {
  await Order.update({ order_status: 'success' }, {
    where: { id: external_id }
  })

  await Transaction.create({
    order_id: external_id, payment_method, payment_status: status, amount, date: paid_at, bank_name: bank_code
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

  const user = await Order.findOne({
    include: [
      {
        model: User,
        attributes: ['id']
      }
    ],
    where: { id: external_id }
  })
  const userId = user.dataValues.User.id

  const purchase_date = moment(paid_at)
  for (let i = 0; i < orderItem.length; i++) {
    const course_duration = orderItem[i].dataValues.Product.duration;
    const expired_date = purchase_date.add(course_duration, 'months').format('YYYY-MM-DD')

    // tambahin user_products
    await UserProduct.create({
      user_id: userId,
      product_id: orderItem[i].dataValues.Product.id,
      status: 'active',
      expired_date
    })
  }

  return external_id
}
