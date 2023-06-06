'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      order_status: {
        type: Sequelize.ENUM('success', 'pending', 'canceled')
      },
      total: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      invoice_id: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      custom_field_1: {
        type: Sequelize.STRING
      },
      custom_field_2: {
        type: Sequelize.STRING
      },
      custom_field_3: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('orders');
  }
};