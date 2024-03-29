'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount_price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    category_id: DataTypes.STRING,
    img_url: DataTypes.STRING,
    quota: DataTypes.INTEGER,
    participants: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};