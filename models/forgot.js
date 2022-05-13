'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forgot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Forgot.init({
    code: DataTypes.STRING,
    user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Forgot',
  });
  return Forgot;
};