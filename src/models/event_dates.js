'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_dates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event_dates.init({
    product_id: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'event_dates',
  });
  return event_dates;
};