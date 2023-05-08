'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('students', [
      {
        user_id: 'user-YbKLaWaZBK',
        phone_number: null,
        address: 'Buleleng',
        birth_date: '2001-01-01'
      },
      {
        user_id: 'user-BOeEA2rrUV',
        phone_number: '081234567890',
        address: 'Denpasar',
        birth_date: '2001-01-02'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  }
};
