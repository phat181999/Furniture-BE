'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product,User}) {
      // define association here
      this.hasMany(Product, {foreignKey: "productFlowTypeID", as:"idManageTypeProduct"})
      this.belongsTo(User, {foreignKey: 'adminTypeProductId', as: 'idAdminTypeProduct'})
    }
  };
  TypeProduct.init({
    nameTypeProduct: DataTypes.STRING,
    imagesTypeProduct:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeProduct',
  });
  return TypeProduct;
};