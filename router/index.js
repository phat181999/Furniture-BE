const express = require('express');
const { userRouter } = require('./user.router');
const { typeProductRouter } = require('./typeProduct.router');
const { productRouter } = require('./product.router');
const { cartRouter } = require('./cart.router');
// const {paymentRouter} = require('.');

const rootRouter = express.Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/typeProduct', typeProductRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/cart', cartRouter);
// rootRouter.use('/payment',paymentRouter);
module.exports = { rootRouter }