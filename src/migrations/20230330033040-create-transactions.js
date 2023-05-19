'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      order_id: {
        type: Sequelize.UUID
      },
      payment_method: {
        type: Sequelize.STRING
      },
      payment_status: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      date: {
        type: Sequelize.DATE
      },
      bank_name: {
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
    await queryInterface.dropTable('transactions');
  }
};