const express  = require("express");
const orderRouter = express.Router();
const { newsOrder,getOrders } = require('../controller/order.controller');

orderRouter.post('/new-order',newsOrder);
orderRouter.get('/get-order',getOrders);

module.exports = {orderRouter}