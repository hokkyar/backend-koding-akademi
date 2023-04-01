'use strict';
/** @type {import('sequelize-cli').Migration} */
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: `user-${nanoid(10)}`,
        email: 'hokky@gmail.com',
        password: bcrypt.hashSync('123', 10),
        name: 'Hokky Aryasta',
        verified: 1,
        phone_number: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `user-${nanoid(10)}`,
        email: 'agung@gmail.com',
        password: bcrypt.hashSync('123', 10),
        name: 'Agung Pernata',
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
