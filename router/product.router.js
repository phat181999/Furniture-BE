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
  paginationProducts,
  filterColor,

  getSearch,

  getFlowTypeProduct
  

} = require("../controller/product.controller");
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

productRouter.post('/create-products',authenticate,authorize(['admin']),uploads.single('products'),createProducts);
productRouter.get('/get-all-products',getAllProducts);
productRouter.get('/get-one-products/:id',getOneProducts);
productRouter.put('/update-products/:id',authenticate,authorize(['admin']),uploads.single('products'),updateProducts);
productRouter.delete('/delete-products/:id',authenticate,authorize(['admin']),deleteProducts);
productRouter.get('/get-desc-products/:page',fillPriceMax); // filter từ cao tới thấp theo phân trang
productRouter.get('/get-asc-products/:page',fillPriceMin); // filter từ thấp tới cao theo phân trang
productRouter.get('/get-pagination/:page',paginationProducts); // phân trang
productRouter.get('/get-filter-color/:colorID/page/:page',filterColor); // phân trang theo màu

productRouter.get('/get-search',getSearch); 

productRouter.get('/get-flow-type-product/:idType/page/:page',getFlowTypeProduct); // products lấy theo typeProducts


module.exports = { productRouter };
