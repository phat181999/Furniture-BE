const express = require('express');
const suppliersRouter = express.Router();
const {
    createSupplier,
    getInformation,
    deleteSupplier
} = require('../controller/suppliers.controller');

suppliersRouter.post('/create-supplier',createSupplier);
suppliersRouter.get('/get-information-supplier',getInformation);
suppliersRouter.delete('/create-supplier',deleteSupplier);

module.exports = { suppliersRouter };