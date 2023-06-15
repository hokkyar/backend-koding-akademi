'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'finished'),
        allowNull: false
      },
      expired_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      meeting_quota: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
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
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_products');
  }
};
