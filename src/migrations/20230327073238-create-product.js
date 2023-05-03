'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      discount_price: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      description: {
        type: Sequelize.TEXT
      },
      category_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      quota: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      participants: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      duration: {
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
    await queryInterface.dropTable('Products');
  }
};