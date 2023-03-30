'use strict';
/** @type {import('sequelize-cli').Migration} */
const { nanoid } = require('nanoid')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: `user-${nanoid(10)}`,
        email: 'tes@gmail.com',
        password: '123',
        name: 'testing account',
        verified: 1,
        phone_number: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `user-${nanoid(10)}`,
        email: 'tes2@gmail.com',
        password: '123',
        name: 'testing account 2',
        verified: 0,
        phone_number: '0812345',
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
