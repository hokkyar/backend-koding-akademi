'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    user_id: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    birth_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};