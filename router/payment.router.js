const express  = require("express");
const paymentRouter = express.Router();
const {payMoney} = require('../controller/payment.controller');

paymentRouter.post('/pay-ment',paymentRouter);

module.exports = {paymentRouter}