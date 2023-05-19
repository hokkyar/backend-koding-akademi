'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // transactions -> orders
    await queryInterface.addConstraint('transactions', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_transactions_order_id',
      references: {
        table: 'orders',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('transactions', 'fk_transactions_order_id')
  }
};
