'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productFlowTypeID: {
        type: Sequelize.INTEGER,
        references:{
          model: 'typeproducts',
          key: 'id'
        }
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      nameProduct: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      color: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      pictures: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};