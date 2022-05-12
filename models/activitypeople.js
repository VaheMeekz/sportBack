'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityPeople extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityPeople.init({
    activity_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ActivityPeople',
  });
  let Activity = sequelize.define("Activity")
  let User = sequelize.define("User")
  ActivityPeople.hasOne(Activity, {
    foreignKey: "id",
  });
  ActivityPeople.belongsTo(User, {
    foreignKey: "user_id",
  });

  return ActivityPeople;
};