'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_coupons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_coupons.init({
    user_id: DataTypes.STRING,
    coupon_id: DataTypes.STRING,
    use_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_coupons',
    underscoredAll: true
  });
  return user_coupons;
};