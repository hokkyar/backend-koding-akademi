'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: 'user-ukLfYouxNvexUH8F',
        role: 'admin',
        email: 'kodingakademi@gmail.com',
        password: bcrypt.hashSync('123abc@@@', 10),
        full_name: 'Koding Akademi',
        verified: 1,
        qr_code: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'user-YbKLaWaZBK',
        role: 'user',
        qr_code: 'id=user-YbKLaWaZBK&pc=0',
        email: 'hokky@gmail.com',
        password: bcrypt.hashSync('123', 10),
        full_name: 'Hokky Aryasta',
        verified: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'user-BOeEA2rrUV',
        role: 'user',
        qr_code: 'id=user-BOeEA2rrUV&pc=0',
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
