'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('event_dates', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_event_dates_products_id',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('products', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_products_category_id',
      references: {
        table: 'categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'fk_products_category_id')
    await queryInterface.removeConstraint('event_dates', 'fk_event_dates_products_id')
  }
};
