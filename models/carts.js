'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Product}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'idUserCart'})
      this.belongsTo(Product, {foreignKey: 'productCartId', as: 'idOfProduct'})
    }
  };
  carts.init({
    productCartId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    totalQuantity: DataTypes.INTEGER,
    totalMoney: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'carts',
  });
  return carts;
};