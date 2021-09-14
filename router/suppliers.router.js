const express = require('express');
const suppliersRouter = express.Router();
const {
    createSupplier,
    getInformation,
    deleteSupplier,
    getOneSupplier
} = require('../controller/suppliers.controller');
const { authenticate } = require ('../middlewares/Authenticate/authenticate');
const { authorize } = require ('../middlewares/Authenticate/authorize');

suppliersRouter.post('/create-supplier',authenticate,authorize(['admin']),createSupplier);
suppliersRouter.get('/get-information-supplier',authenticate,authorize(['admin']),getInformation);
suppliersRouter.get('/get-one-supplier/:id',authenticate,authorize(['admin']),getOneSupplier);
suppliersRouter.delete('/create-supplier',authenticate,authorize(['admin']),deleteSupplier);

module.exports = { suppliersRouter };