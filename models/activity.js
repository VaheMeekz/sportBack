'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Activity.init({
        creator_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING(1234),
        sport_id: DataTypes.INTEGER,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        peoplesCount: DataTypes.STRING,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Activity',
    });

    let ActivityPeople = sequelize.define("ActivityPeople")
    let ActivityInvite = sequelize.define("ActivityInvite")
    let Sport = sequelize.define("Sports")
    let User = sequelize.define("User")
    Activity.hasMany(ActivityPeople, {
        foreignKey: "activity_id",
    });
    Activity.hasOne(User, {
        foreignKey: "id",
        as: "Creator"
    })
    Activity.hasOne(Sport, {
        foreignKey: "id"
    })
    Activity.hasMany(ActivityInvite, {
        foreignKey: "id"
    })
    return Activity;
};