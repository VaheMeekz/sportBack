'use strict';
const data = require('../utils/data/data').users
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
