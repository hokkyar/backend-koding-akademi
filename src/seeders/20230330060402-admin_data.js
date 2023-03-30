'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('admins', [
      {
        username: 'koding_akademi',
        password: '123',
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
