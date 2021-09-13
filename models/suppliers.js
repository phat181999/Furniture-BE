'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Suppliers.init({
    nameSuppliers: DataTypes.STRING,
    addressSuppliers: DataTypes.STRING,
    numberPhone: DataTypes.INTEGER,
    quantityItems: DataTypes.INTEGER,
    discountMoney: DataTypes.INTEGER,
    email: DataTypes.STRING,
    items: DataTypes.STRING,
    importer: DataTypes.STRING,
    totalMoneyBuy: DataTypes.FLOAT,
    priceInput: DataTypes.FLOAT,
    nameAdmin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suppliers',
  });
  return Suppliers;
};