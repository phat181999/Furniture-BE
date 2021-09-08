const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadPictures = (type)=>{
    
    const made = mkdirp.sync(`./public/images/${type}`);
    const storage = multer.diskStorage({
    
        destination: function (req, file, cb) {
            cb(null, './public/uploads/')
            
        },
        filename: function (req, file, cb) {
            // console.log(file);
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
        
    });

    const upload = multer({storage:storage})
    return upload.array('products')(type), (req,res) => {
        res.send("done");
    }
}
  module.exports = {
    uploadPictures,
  };