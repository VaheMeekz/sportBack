'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    skype:DataTypes.STRING,
    telegram:DataTypes.STRING,
    whatsapp:DataTypes.STRING,
    communication:DataTypes.STRING,
    image:DataTypes.STRING,
    address1:DataTypes.STRING,
    address2:DataTypes.STRING,
    facebook:DataTypes.STRING,
    tiktok:DataTypes.STRING,
    instagram:DataTypes.STRING,
    linkedin:DataTypes.STRING,
    youtube:DataTypes.STRING,
    token:DataTypes.STRING,
    userSport_id:DataTypes.INTEGER,
    team_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  let UserSport = sequelize.define("UserSport");
  let UserTeam = sequelize.define("UserTeam");
  let ActivityPeople = sequelize.define("ActivityPeople");
  let Activity = sequelize.define("Activity")
  let Conversation = sequelize.define("Conversation")
  User.hasMany(UserSport, {
    foreignKey: "id",
  });
  User.hasMany(UserTeam, {
    foreignKey: "id",
  });
  User.hasMany(ActivityPeople,{
    foreignKey:"id"
  })
  User.hasOne(Activity,{
    foreignKey:"creator_id"
  })


  User.belongsTo(Conversation,{
    foreignKey:"id"
  })
  return User;
};