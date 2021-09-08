// require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'demo-project', 
  api_key: '815568646484313', 
  api_secret: 'az33LMviYjQt8qUdxeoVseuPFK4' 
});

module.exports = {cloudinary}