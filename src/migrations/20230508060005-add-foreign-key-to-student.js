'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // students -> users
    await queryInterface.addConstraint('students', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_students_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('students', 'fk_students_user_id')
  }
};
