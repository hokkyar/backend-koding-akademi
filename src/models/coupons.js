'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coupons.init({
    coupon_code: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    coupon_start: DataTypes.DATE,
    coupon_end: DataTypes.DATE,
    quota: DataTypes.INTEGER,
    minimum_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'coupons',
  });
  return coupons;
};