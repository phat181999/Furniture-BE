const express = require('express');
const checkoutExpress = express.Router();
const { CheckOutCart,getCheckOutUser } = require('../controller/checkout.controller');
const { authenticate } = require("../middlewares/Authenticate/authenticate");
const { authorize } = require("../middlewares/Authenticate/authorize");

checkoutExpress.post('/check-out-cart',authenticate,CheckOutCart)
checkoutExpress.get('/get-check-out-user',authenticate,getCheckOutUser)

module.exports = {checkoutExpress}