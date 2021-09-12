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
    static associate({Product}) {
      // define association here
      this.hasMany(Product, {foreignKey: "productFlowTypeID", as:"flowTypeProducts"})
    }
  };
  TypeProduct.init({
    nameTypeProduct: {
      type: DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your nameProduct'
        },
      validate: 
        {
          notEmpty: true,
          len: [5,100],
        },
    },
    imagesTypeProduct:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeProduct',
  });
  return TypeProduct;
};