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
      this.hasMany(carts, {foreignKey: 'productCartId', as: 'idOfProduct'})
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
    }
    }, {
    sequelize,
    modelName: 'Product',
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ['nameProduct', 'color']
  });
  return Product;
};