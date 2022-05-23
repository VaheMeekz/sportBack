'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: Sequelize.STRING,
            lastName: Sequelize.STRING,
            email: Sequelize.STRING,
            password:Sequelize.STRING,
            gender: Sequelize.STRING,
            telegram: Sequelize.STRING,
            whatsapp: Sequelize.STRING,
            birth: Sequelize.STRING,
            image: Sequelize.STRING,
            address1: Sequelize.STRING,
            address2: Sequelize.STRING,
            facebook: Sequelize.STRING,
            tiktok: Sequelize.STRING,
            city:Sequelize.STRING,
            state:Sequelize.STRING,
            country:Sequelize.STRING,
            postalCode:Sequelize.STRING,
            instagram: Sequelize.STRING,
            linkedin: Sequelize.STRING,
            youtube: Sequelize.STRING,
            token: Sequelize.STRING,
            userSport_id:Sequelize.INTEGER,
            team_id:Sequelize.INTEGER,
            status:Sequelize.BOOLEAN,
            socketId:Sequelize.STRING,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};