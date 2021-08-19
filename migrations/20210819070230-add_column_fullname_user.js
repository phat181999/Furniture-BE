'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
  {
    return queryInterface.addColumn(
      'users',
      'fullname',
      Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) =>
  {
    return queryInterface.removeColumn(
      'users',
      'fullname',

    )
  }
};
