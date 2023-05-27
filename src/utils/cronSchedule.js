const { UserProduct } = require('../models/index')
const { Op } = require('sequelize')
const cron = require('node-cron')

async function updateUserProductStatusToExpired() {
  try {
    const currentDate = new Date
    await UserProduct.update({ status: 'finished' }, {
      where: {
        expired_date: { [Op.lt]: currentDate }
      }
    })
  } catch (error) {
    console.log('An error occured')
  }
}

const task = cron.schedule('0 0 * * * *', updateUserProductStatusToExpired)

module.exports = task