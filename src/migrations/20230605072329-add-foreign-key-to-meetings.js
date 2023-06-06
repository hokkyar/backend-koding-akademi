'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // meetings -> users
    await queryInterface.addConstraint('meetings', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_meetings_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // meetings -> products
    await queryInterface.addConstraint('meetings', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_meetings_product_id',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('meetings', 'fk_meetings_user_id')
    await queryInterface.removeConstraint('meetings', 'fk_meetings_product_id')
  }
};
