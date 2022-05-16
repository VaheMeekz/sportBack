'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversation.init({
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    pinned_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Conversation',
  });

  let User = sequelize.define("User")
  let Message = sequelize.define("Messages")
  Conversation.belongsTo(User,{
    foreignKey:"receiver_id",
    as:"Receiver"
  })
  Conversation.belongsTo(User,{
    foreignKey:"sender_id",
    as:"Sender"
  })
  Conversation.hasMany(Message,{
    foreignKey:"conversation_id"
  })
  return Conversation;
};