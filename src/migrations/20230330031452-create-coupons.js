'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      coupon_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      discount: {
        allowNull: false,
        type: Sequelize.DOUBLE(10, 2)
      },
      coupon_start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      coupon_end: {
        allowNull: false,
        type: Sequelize.DATE
      },
      quota: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('coupons');
  }
};