'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CONFIGS', [
      {
        CONFIG_NAME: 'USER_CREATE',
        CONFIG_VALUE: 'TRUE',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        CONFIG_NAME: 'USER_LOGIN',
        CONFIG_VALUE: 'TRUE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CONFIGS', null, {});
  }
};
