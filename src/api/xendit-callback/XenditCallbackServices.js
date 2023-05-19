const { Order, OrderItem, Transaction, Product, User, UserProduct, sequelize } = require('../../models/index')
const moment = require('moment')

exports.xenditCallbackService = async ({ external_id, payment_method, status, amount, paid_at, bank_code }) => {
  try {
    await sequelize.transaction(async (t) => {

      await Order.update({ order_status: 'success' }, {
        where: { id: external_id }, transaction: t
      })

      await Transaction.create({
        order_id: external_id, payment_method, payment_status: status, amount, date: paid_at, bank_name: bank_code
      }, { transaction: t })

      const orderItems = await OrderItem.findAll({
        include: [
          {
            model: Product,
            attributes: ['id', 'duration']
          }
        ],
        where: { order_id: external_id },
        transaction: t
      })

      const user = await Order.findOne({
        include: [
          {
            model: User,
            attributes: ['id']
          }
        ],
        where: { id: external_id },
        transaction: t
      })

      const userId = user.User.id
      const purchase_date = moment(paid_at)
      const userProducts = orderItems.map((orderItem) => {
        const course_duration = orderItem.Product.duration
        const expired_date = purchase_date.add(course_duration, 'months').format('YYYY-MM-DD')
        return {
          user_id: userId,
          product_id: orderItem.Product.id,
          status: 'active',
          expired_date
        }
      })
      await UserProduct.bulkCreate(userProducts, { transaction: t })
    })
  } catch (error) {
    console.log('An error occured: ', error)
  }
  return external_id
}
