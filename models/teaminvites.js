'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamInvites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamInvites.init({
    team_id: DataTypes.INTEGER,
    sender_id:DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TeamInvites',
  });
  let Team = sequelize.define("Team")
  TeamInvites.belongsTo(Team, {
    foreignKey:"id",
  })
  return TeamInvites;
};