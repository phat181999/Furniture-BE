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
<<<<<<< HEAD
    nameTypeProduct: DataTypes.STRING,
=======
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
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
    imagesTypeProduct:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeProduct',
  });
  return TypeProduct;
};