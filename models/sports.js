'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sports.init({
    sportName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sports',
  });

  let UserSports = sequelize.define("UserSport")
  let Team = sequelize.define("Team")
  let Activity = sequelize.define("Activity")
  Sports.hasOne(UserSports,{
    foreignKey:"sportId"
  })
  Sports.hasOne(Team, {
    foreignKey: "sport_id",
  });
  Sports.belongsTo(Activity,{
    foreignKey:"id"
  })
  return Sports;
};