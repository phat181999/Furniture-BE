const express = require('express');

const {userRouter} = require('./user.router');
const {typeProductRouter} = require('./typeProduct.router');
const {productRouter} = require('./product.router');
const {paymentRouter} = require('./payment.router');
const {deliverRouter} = require('./deliver.router');
const {EmailRouter} = require('./email.router');
const {colorRouter} = require('./color.router');
const { orderRouter } = require('./order.router');
const { billsRouter } = require('./bills.router');
const { suppliersRouter } = require('./suppliers.router');

const rootRouter = express.Router();
rootRouter.use('/user',userRouter);
rootRouter.use('/typeProduct',typeProductRouter);
rootRouter.use('/product',productRouter);
rootRouter.use('/payment',paymentRouter);
rootRouter.use('/deliver',deliverRouter);
rootRouter.use('/email',EmailRouter);
rootRouter.use('/color',colorRouter);
rootRouter.use('/order',orderRouter);
rootRouter.use('/bill',billsRouter);
rootRouter.use('/suppliers',suppliersRouter);
module.exports={rootRouter}
