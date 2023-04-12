'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_products.init({
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    status: DataTypes.STRING,
    expired_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_products',
  });
  return user_products;
};