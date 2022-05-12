'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSport.init({
    userId: DataTypes.INTEGER,
    sportId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSport',
  });

  let Users = sequelize.define("User");
  let Sports = sequelize.define("Sports")
  UserSport.belongsTo(Users, {
    foreignKey: "userId",
  });
  UserSport.belongsTo(Sports,{
    foreignKey:"id"
  })
  return UserSport;
};