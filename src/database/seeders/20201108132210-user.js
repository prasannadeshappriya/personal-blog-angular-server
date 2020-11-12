'use strict';
//const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //const salt = await bcrypt.genSalt(10);
    //const hash = await bcrypt.hash('password', salt);
    const hash = '$2b$10$byjQc0PYkwKCsaYuDjnuZOAIXy086gBWT50jE7TFE2KkjegWKL7CG'

    await queryInterface.bulkInsert('USERS', [{
      FIRST_NAME: 'Prasanna',
      LAST_NAME: 'Deshappriya',
      EMAIL: 'prasannadeshappriya@gmail.com',
      PASSWORD: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('USERS', null, {});
  }
};
