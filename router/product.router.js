const express = require("express");
const productRouter = express.Router();
const {
  createProducts,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
  fillPriceMax,
  fillPriceMin,
  paginationProducts
} = require("../controller/product.controller");
const {uploadImage} = require('../middlewares/upload/upload-image');
const {AlotOfUploadImage} = require('../middlewares/upload/aLotOf-Images');
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');

productRouter.post('/create-products',authenticate,authorize(['admin']),uploadImage('products'),createProducts);
productRouter.get('/get-all-products',getAllProducts);
productRouter.get('/get-one-products/:id',getOneProducts);
productRouter.put('/update-products/:id',authenticate,authorize(['admin']),updateProducts);
productRouter.delete('/delete-products/:id',authenticate,authorize(['admin']),deleteProducts);
productRouter.get('/get-desc-products',fillPriceMax);
productRouter.get('/get-asc-products',fillPriceMin);
productRouter.get('/get-pagination/:page',paginationProducts);
module.exports = { productRouter };
