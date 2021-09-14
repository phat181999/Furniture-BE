const multer = require('multer');

const uploadCloundinary = () =>{
    const storage = multer.diskStorage({});

    const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
    };
    const uploads = multer({ storage, fileFilter });
    return uploads.single('delivery')
};

module.exports = { uploadCloundinary }