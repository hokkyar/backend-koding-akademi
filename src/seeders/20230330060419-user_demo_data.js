'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: 'user-ukLfYouxNvexUH8F',
        email: 'kodingakademi@gmail.com',
        password: bcrypt.hashSync('123abc@@@', 10),
        full_name: 'Koding Akademi',
        verified: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'user-YbKLaWaZBK',
        email: 'hokky@gmail.com',
        password: bcrypt.hashSync('123', 10),
        full_name: 'Hokky Aryasta',
        verified: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'user-BOeEA2rrUV',
        email: 'agung@gmail.com',
        password: bcrypt.hashSync('123', 10),
        full_name: 'Agung Pernata',
        verified: 1,
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
