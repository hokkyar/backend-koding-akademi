'use strict';
/** @type {import('sequelize-cli').Migration} */
const { nanoid } = require('nanoid')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('carts', [
      {
        id: `cart-${nanoid(16)}`,
        user_id: 'user-YbKLgb8sfcaWaZBK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `cart-D1MKOcFQY_EvIsVo`,
        user_id: 'user-BOeEA2b7ygfdrrUV',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts', null, {});
  }
};
