'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('categories', [
      {
        id: 'cat-course-1',
        name: 'Coding',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cat-course-2',
        name: 'App Programming',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cat-course-3',
        name: 'Engineering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cat-course-4',
        name: 'Coding Bootcamp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cat-course-5',
        name: 'Robotic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cat-event-1',
        name: 'Event',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
