'use strict';
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('admins', [
      {
        username: 'koding_akademi',
        password: bcrypt.hashSync('123abc@@@', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
