const express = require('express');

const {userRouter} = require('./user.router');
const {typeProductRouter} = require('./typeProduct.router');
const {productRouter} = require('./product.router');
const {paymentRouter} = require('./payment.router');
const {checkoutExpress} = require('./checkout.router');
const {EmailRouter} = require('./email.router');
const {colorRouter} = require('./color.router');

const rootRouter = express.Router();
rootRouter.use('/user',userRouter);
rootRouter.use('/typeProduct',typeProductRouter);
rootRouter.use('/product',productRouter);
rootRouter.use('/payment',paymentRouter);
rootRouter.use('/check-out',checkoutExpress);
rootRouter.use('/email',EmailRouter);
rootRouter.use('/color',colorRouter);
module.exports={rootRouter}
