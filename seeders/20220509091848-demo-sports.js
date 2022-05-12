'use strict';
const data = require('../utils/data/data').sports
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Sports', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sports', null, {});
  }
};
