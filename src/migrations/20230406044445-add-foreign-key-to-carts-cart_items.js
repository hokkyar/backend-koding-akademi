'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // carts
    await queryInterface.addConstraint('carts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_carts_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // cart_items-- > carts
    await queryInterface.addConstraint('cart_items', {
      fields: ['cart_id'],
      type: 'foreign key',
      name: 'fk_cart_items_cart_id',
      references: {
        table: 'carts',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // cart_items --> products
    await queryInterface.addConstraint('cart_items', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_cart_items_product_id',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cart_items', 'fk_cart_items_product_id')
    await queryInterface.removeConstraint('cart_items', 'fk_cart_items_cart_id')
    await queryInterface.removeConstraint('carts', 'fk_carts_user_id')
    await queryInterface.removeConstraint('products', 'fk_products_category_id')
    await queryInterface.removeConstraint('event_dates', 'fk_event_dates_products_id')
  }
};
