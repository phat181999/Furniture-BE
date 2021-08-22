const express  = require("express");
const paymentRouter = express.Router();
<<<<<<< HEAD


=======
const {payMoney} = require('../controller/payment.controller');

paymentRouter.post('/pay-ment',paymentRouter);
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9

module.exports = {paymentRouter}