'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('event_dates', [
      {
        product_id: 'event-d7ZlY_p8lcKNhs6d',
        date: '2023-03-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'event-a1VgY_le4fMAbx2m',
        date: '2023-03-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'event-a1VgY_le4fMAbx2m',
        date: '2023-03-11',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 'event-a1VgY_le4fMAbx2m',
        date: '2023-03-12',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
