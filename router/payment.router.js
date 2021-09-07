const express  = require("express");
const paymentRouter = express.Router();
const { payMoneyStripe,payMentPaypal } = require('../controller/payment.controller');

paymentRouter.post('/pay-ment-stripe',payMoneyStripe);
paymentRouter.post('/pay-ment-paypal',payMentPaypal);

module.exports = {paymentRouter}