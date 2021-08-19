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
    nameProduct: DataTypes.STRING,
    color: DataTypes.STRING,
    pictures: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    price: DataTypes.FLOAT
    }, {
    sequelize,
    modelName: 'Product',
  });
  SequelizeSlugify.slugifyModel(Product, {
    source: ['nameProduct', 'color']
  });
  return Product;
};