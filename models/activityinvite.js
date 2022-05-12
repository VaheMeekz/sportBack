'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityInvite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityInvite.init({
    sender_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    recivier_id: DataTypes.INTEGER,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ActivityInvite',
  });
  let Activity = sequelize.define("Activity")

  ActivityInvite.belongsTo(Activity,{
    foreignKey:"activity_id"
  })
  return ActivityInvite;
};