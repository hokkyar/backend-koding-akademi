'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('event_dates', [
      {
        product_id: 'event-sUZlY_48YeNNhq4j',
        date: '2023-04-04',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'event-sUZlY_48YeNNhq4j',
        date: '2023-04-05',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('event_dates', null, {});
  }
};
