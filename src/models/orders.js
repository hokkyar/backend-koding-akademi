'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    user_id: DataTypes.STRING,
    order_status: DataTypes.STRING,
    total: DataTypes.INTEGER,
    invoice_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
    underscoredAll: true
  });
  return orders;
};