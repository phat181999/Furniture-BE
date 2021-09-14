const express = require("express");
const colorRouter = express.Router();
const {
  createColors,
  getAllColors,
  getOneColors,
  updateColors,
  deleColors,
  handleMultipleColors
} = require("../controller/color.controller");
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');

colorRouter.post('/create-color',createColors)
colorRouter.get('/get-all-color',getAllColors)
colorRouter.get('/get-one-color',getOneColors)
colorRouter.put('/update-color',updateColors)
colorRouter.delete('/delete-color',deleColors)
colorRouter.post('/create-update-multiple-color',authenticate,authorize(['admin']),handleMultipleColors)//authenticate,authorize(['admin']),

module.exports = { colorRouter }