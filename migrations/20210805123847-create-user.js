'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) =>
  {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      account: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
<<<<<<< HEAD
        defaultValue: "UNGVIEN",
=======
        defaultValue: "user",
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
      },
      phone: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
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
  down: async (queryInterface, Sequelize) =>
  {
    await queryInterface.dropTable('Users');
  }
};