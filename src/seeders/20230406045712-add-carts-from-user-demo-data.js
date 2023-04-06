'use strict';
/** @type {import('sequelize-cli').Migration} */
const { nanoid } = require('nanoid')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('carts', [
      {
        id: `cart-${nanoid(16)}`,
        user_id: 'user-YbKLaWaZBK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `cart-${nanoid(16)}`,
        user_id: 'user-BOeEA2rrUV',
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
