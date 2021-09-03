const express = require("express");
const colorRouter = express.Router();
const {
  createColors,
  getAllColors,
  getOneColors,
  updateColors,
  deleColors,
} = require("../controller/color.controller");

colorRouter.post('/create-color',createColors)
colorRouter.get('/get-all-color',getAllColors)
colorRouter.get('/get-one-color',getOneColors)
colorRouter.put('/update-color',updateColors)
colorRouter.delete('/delete-color',deleColors)

module.exports = { colorRouter }