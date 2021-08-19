const express = require("express");
const productRouter = express.Router();
const {
  createProducts,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
} = require("../controller/product.controller");
const {uploadImage} = require('../middlewares/upload/upload-image');
const {AlotOfUploadImage} = require('../middlewares/upload/aLotOf-Images');
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');

productRouter.post('/create-products',authenticate,authorize(['admin']),createProducts);
productRouter.get('/get-all-products',getAllProducts);
productRouter.get('/get-one-products/:id',getOneProducts);
productRouter.put('/update-products/:id',updateProducts);
productRouter.delete('/delete-products/:id',deleteProducts);

module.exports = { productRouter };
