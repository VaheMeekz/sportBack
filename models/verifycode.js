'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerifyCode.init({
    number: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VerifyCode',
  });
  return VerifyCode;
};