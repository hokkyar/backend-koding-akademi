'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // event_dates -> products
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
    // products -> categories
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
    // carts -> users
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
    // order_items --> order
    await queryInterface.addConstraint('order_items', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_order_items_order_id',
      references: {
        table: 'orders',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('event_dates', 'fk_event_dates_products_id')
    await queryInterface.removeConstraint('products', 'fk_products_category_id')
    await queryInterface.removeConstraint('carts', 'fk_carts_user_id')
    await queryInterface.removeConstraint('cart_items', 'fk_cart_items_cart_id')
    await queryInterface.removeConstraint('cart_items', 'fk_cart_items_product_id')
    await queryInterface.removeConstraint('order_items', 'fk_order_items_order_id')
  }
};
