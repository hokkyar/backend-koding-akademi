'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('user_products', [
      {
        user_id: 'user-BOeEA2b7ygfdrrUV',
        product_id: 'course-UJaUxuow1BMfRjEc',
        status: 'active',
        expired_date: '2024-10-10',
        meeting_quota: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 'user-BOeEA2b7ygfdrrUV',
        product_id: 'course-NjelVee7XHAFmhhD',
        status: 'finished',
        expired_date: '2023-01-02',
        meeting_quota: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_products', null, {});
  }
};
