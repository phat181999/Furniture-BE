const express = require('express');
<<<<<<< HEAD
const { userRouter } = require('./user.router');
const { typeProductRouter } = require('./typeProduct.router');
const { productRouter } = require('./product.router');
const { cartRouter } = require('./cart.router');
// const {paymentRouter} = require('.');
=======

const {userRouter} = require('./user.router');
const {typeProductRouter} = require('./typeProduct.router');
const {productRouter} = require('./product.router');
const {cartRouter} = require('./cart.router');
const {paymentRouter} = require('./payment.router');

>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9

const rootRouter = express.Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/typeProduct', typeProductRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/cart', cartRouter);
// rootRouter.use('/payment',paymentRouter);
module.exports = { rootRouter }