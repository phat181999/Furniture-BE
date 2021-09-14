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
      colorProductsID: {
        type: Sequelize.INTEGER,
        references:{
          model: 'colors',
          key: 'id'
        }
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
      quantityProducts: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      picturesZero: {
        type: Sequelize.STRING 
      },
      picturesOne: {
        type: Sequelize.STRING 
      },
      picturesTwo: {
        type: Sequelize.STRING 
      },
      picturesThree: {
        type: Sequelize.STRING 
      },
      picturesFour: {
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