'use strict';
const {
  Model
} = require('sequelize');
const {SequelizeSlugify} = require('sequelize-slugify');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TypeProduct,Images,User,carts,orderDetails}) {
      // define association here
      this.belongsTo(TypeProduct, {foreignKey: "productFlowTypeID", as:"idProductFlowType"})
      this.hasMany(Images, {foreignKey: 'imagesProductID', as: 'idImagesProduct'})
      this.belongsTo(User,  {foreignKey: 'adminProductId', as: 'idAdminProduct'})
      this.hasMany(carts, {foreignKey: 'productCartId', as: 'idOfProduct'})
    }
  };
  Product.init({
<<<<<<< HEAD
    nameProduct: DataTypes.STRING,
    color: DataTypes.STRING,
    pictures: DataTypes.STRING,
=======
    nameProduct: {
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
    color: {
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
    pictures: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: 
        {
          msg: 'Please enter your description'
        },
      validate: 
        {
          notEmpty: true,
          len: [10,1000],
        },
    },
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
<<<<<<< HEAD
    price: DataTypes.FLOAT
=======
    price: {
      type:DataTypes.FLOAT,
      allowNull: 
        {
          msg: 'Please enter your price'
        },
      validate: 
        {
          notEmpty: true,
          len: [10,225],
        },
    }
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
    }, {
    sequelize,
    modelName: 'Product',
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ['nameProduct', 'color']
  });
  return Product;
};