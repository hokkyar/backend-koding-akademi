'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meetings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meetings.init({
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'meetings',
    underscoredAll: true
  });
  return meetings;
};