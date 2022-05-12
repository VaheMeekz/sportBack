'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    sport_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });

  let Sports = sequelize.define("Sports")
  let UserTeam = sequelize.define("UserTeam")
  let Invite = sequelize.define("TeamInvites")
  Team.belongsTo(Sports, {
    foreignKey: "id",
  });
  Team.hasMany(UserTeam, {
    foreignKey:"team_id",
  })
  Team.hasMany(Invite, {
    foreignKey:"team_id",
  })
  return Team;
};