const { Order, OrderItem, Transaction, Product, User, UserProduct, sequelize, Sequelize } = require('../../models/index')
const { Op } = require('sequelize')
const moment = require('moment')
const { encryptData } = require('../../utils/encryptData')

exports.xenditCallbackService = async ({ external_id, payment_method, status, amount, paid_at, bank_code }) => {

  if (status === 'EXPIRED') {
    await Order.update({ order_status: 'canceled' }, {
      where: { id: external_id }
    })
  }

  if (status === 'PAID') {
    try {
      await sequelize.transaction(async (t) => {

        await Order.update({ order_status: 'success' }, {
          where: { id: external_id }, transaction: t
        })

        await Transaction.create({
          order_id: external_id, payment_method, payment_status: status, amount, date: paid_at, bank_name: bank_code
        }, { transaction: t })

        const orderItems = await OrderItem.findAll({
          attributes: ['selected_date'],
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

        let orderedProducts = orderItems.map((orderItem) => {
          if (orderItem.selected_date) {
            return {
              user_id: userId,
              product_id: orderItem.Product.id,
              status: 'active',
              expired_date: orderItem.selected_date
            }
          } else {
            const course_duration = orderItem.Product.duration
            const expired_date = purchase_date.add(course_duration, 'months').format('YYYY-MM-DD')
            return {
              user_id: userId,
              product_id: orderItem.Product.id,
              status: 'active',
              expired_date
            }
          }
        })

        const productList = orderedProducts.map((item) => item.product_id)

        await Product.update(
          { participants: Sequelize.literal('participants + 1') },
          { where: { id: { [Op.in]: productList }, category_id: 'cat-event-1' }, transaction: t }
        )

        const finishedProduct = await UserProduct.findAll({
          where: {
            status: 'finished',
            user_id: userId,
            product_id: productList
          }
        })

        let neverBoughtProduct = orderedProducts
        if (finishedProduct.length !== 0) {
          const finishedProductId = finishedProduct.map((item) => item.product_id)
          const extendProduct = orderedProducts.filter((item) => item.product_id.includes(finishedProductId))
          neverBoughtProduct = orderedProducts.filter((item) => !extendProduct.includes(item))

          for (let i = 0; i < extendProduct.length; i++) {
            await UserProduct.update({ status: 'active', expired_date: extendProduct[i].expired_date },
              {
                where: {
                  user_id: userId,
                  product_id: extendProduct[i].product_id
                },
                transaction: t
              })
          }

        }
        await UserProduct.bulkCreate(neverBoughtProduct, { transaction: t })
        await User.update({ qr_code: encryptData(`id=${userId}&tr=${external_id}`) }, { where: { id: userId }, transaction: t })
      })
    } catch (error) {
      console.log('An error occured: ', error)
    }
  }

  return external_id
}
