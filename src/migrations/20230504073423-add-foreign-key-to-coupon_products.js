'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // coupon_products -> products
    await queryInterface.addConstraint('coupon_products', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_coupon_products_product_id',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    // coupon_products -> coupons
    await queryInterface.addConstraint('coupon_products', {
      fields: ['coupon_id'],
      type: 'foreign key',
      name: 'fk_coupon_products_coupon_id',
      references: {
        table: 'coupons',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('coupon_products', 'fk_coupon_products_product_id')
    await queryInterface.removeConstraint('coupon_products', 'fk_coupon_products_coupon_id')
  }
};
