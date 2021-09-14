const express  = require("express");
const billsRouter = express.Router();
const { createBill,getBills,changeStatus } = require('../controller/bills.controller');
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');

billsRouter.post('/new-bill',authenticate,createBill);
billsRouter.get('/get-order',authenticate,getBills);
billsRouter.put('/update-order/:id',authenticate,authorize(['admin']),changeStatus);
module.exports = {billsRouter}