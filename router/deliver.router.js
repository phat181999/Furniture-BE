const express = require('express')
const deliverRouter = express.Router()
const {createDelever} = require('../controller/deliver.controller')
// const {uploadCloundinary} = require('../middlewares/upload/uploadCoudinary')
const multer = require('multer');
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
if (file.mimetype.startsWith('image')) {
    cb(null, true);
} else {
    cb('invalid image file!', false);
}
};
const uploads = multer({ storage, fileFilter });
deliverRouter.post('/new-deliver',uploads.single('delivery'),createDelever)

module.exports = { deliverRouter } 
