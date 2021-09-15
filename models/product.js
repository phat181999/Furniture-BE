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
    static associate({TypeProduct,colors,bill}) {
      // define association here
      this.belongsTo(TypeProduct, {foreignKey: "productFlowTypeID", as:"flowTypeProducts"})
      this.belongsTo(colors, {foreignKey: 'colorProductsID', as: 'colorFlowProducts'})
      this.belongsToMany(bill, {foreignKey: 'listProductsID', as: 'productsList', through: 'orders'})
    }
  };
  Product.init({
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
    picturesZero: [{
      type:DataTypes.STRING,
      URL: String,
      filename: String
    }] ,
    picturesOne: [{
      type:DataTypes.STRING,
      URL: String,
      filename: String
    }] ,
    picturesTwo: [{
      type:DataTypes.STRING,
      URL: String,
      filename: String
    }] ,
    picturesThree: [{
      type:DataTypes.STRING,
      URL: String,
      filename: String
    }] ,
    picturesFour: [{
      type:DataTypes.STRING,
      URL: String,
      filename: String
    }] ,
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
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      type:DataTypes.FLOAT,
      allowNull: 
        {
          msg: 'Please enter your price'
        },
      validate: 
        {
          notEmpty: true,
          len: [5,20],
        },
    },
    quantityProducts: {
      type:DataTypes.FLOAT,
      allowNull: 
        {
          msg: 'Please enter your quantity Products'
        },
      validate: 
        {
          notEmpty: true,
          len: [1,20],
        },
    },
    }, {
    sequelize,
    modelName: 'Product',
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ['nameProduct', 'color']
  });
  return Product;
};