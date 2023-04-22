'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // user_products -> products
    await queryInterface.addConstraint('user_products', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_user_products_product_id',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // user_products -> user
    await queryInterface.addConstraint('user_products', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_products_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_products', 'fk_user_products_product_id')
    await queryInterface.removeConstraint('user_products', 'fk_user_products_user_id')
  }
};
