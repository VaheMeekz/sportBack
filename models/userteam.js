'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTeam.init({
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTeam',
  });
  let Users = sequelize.define("User");
  let Team = sequelize.define("Team");
  UserTeam.belongsTo(Users, {
    foreignKey: "user_id",
  });
  UserTeam.hasOne(Team, {
    foreignKey:"id",
  })
  return UserTeam;
};