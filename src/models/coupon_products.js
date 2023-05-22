'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coupon_products.init({
    product_id: DataTypes.STRING,
    coupon_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'coupon_products',
    underscoredAll: true
  });
  return coupon_products;
};