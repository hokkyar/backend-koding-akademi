'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('students', [
      {
        user_id: 'user-YbKLgb8sfcaWaZBK',
        phone_number: null,
        address: 'Buleleng',
        birth_date: '2001-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 'user-BOeEA2b7ygfdrrUV',
        phone_number: '081234567890',
        address: 'Denpasar',
        birth_date: '2001-01-02',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  }
};
