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
        type: Sequelize.INTEGER
      },
      discount_price: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      requirement: {
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
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
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