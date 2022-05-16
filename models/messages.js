'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init({
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER,
    text: DataTypes.STRING(1234),
    like: DataTypes.STRING,
    seen:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Messages',
  });

  let Conversation = sequelize.define("Conversation")
  Messages.belongsTo(Conversation,{
    foreignKey:"id"
  })
  return Messages;
};