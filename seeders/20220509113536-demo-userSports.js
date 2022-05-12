'use strict';
const data = require('../utils/data/data').usersSports
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserSports', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserSports', null, {});
  }
};
