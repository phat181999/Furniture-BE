const  express  = require("express");
const typeProductRouter = express.Router();
const {
  createTypeProduct,
  getAllTypeProduct,
  getOneTypeProduct,
  updateTypeProduct,
  deleTypeProduct,
  getFlowTypeProduct
} = require("../controller/typeProduct.controller");
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');
const {uploadImage} = require('../middlewares/upload/upload-image');

typeProductRouter.post('/create-type-product',authenticate,authorize(['admin']),uploadImage('typeproducts'),createTypeProduct);
typeProductRouter.get('/get-all-type-product',getAllTypeProduct);
typeProductRouter.get('/get-one-type-product/:id',getOneTypeProduct);
typeProductRouter.put('/update-type-product/:id',authenticate,authorize(['admin']),updateTypeProduct);
typeProductRouter.delete('/delete-type-product/:id',authenticate,authorize(['admin']),deleTypeProduct);
typeProductRouter.get('/get-flow-type-product/:idType/page/:page',getFlowTypeProduct); // products lấy theo typeProducts

module.exports = {typeProductRouter}