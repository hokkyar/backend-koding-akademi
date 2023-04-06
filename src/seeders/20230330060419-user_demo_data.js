'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: 'user-YbKLaWaZBK',
        email: 'hokky@gmail.com',
        password: bcrypt.hashSync('123', 10),
        full_name: 'Hokky Aryasta',
        verified: 1,
        phone_number: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'user-BOeEA2rrUV',
        email: 'agung@gmail.com',
        password: bcrypt.hashSync('123', 10),
        full_name: 'Agung Pernata',
        verified: 1,
        phone_number: '081234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
