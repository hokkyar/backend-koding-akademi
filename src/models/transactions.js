'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init({
    order_id: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
    bank_name: DataTypes.STRING,
    account_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};