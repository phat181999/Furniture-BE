const { deliver } = require('../models')
const { cloudinary } = require('../untils/cloundinary');

const createDelever = async (req,res) => {
    const result = await cloudinary.uploader.upload(req.file.path,{
        public_id:'delivery',
        with: 500,
        height: 500,
        crop: 'fill'
    })
    await deliver.create({drivingLicense:result.url})
    .then((data) =>{
        res.send(data)
    })
    .catch((err) =>{
        throw err
    })
};

module.exports = {
    createDelever
}