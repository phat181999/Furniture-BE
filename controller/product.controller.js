const { Product, Images } = require("../models");
const multer = require("multer");

const createProducts = async (req, res) => {
  const { nameProduct, color, price, description } = req.body;
  try {
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
    const upload = multer({storage:storage});
    const uploadPictures = upload.single('products');
    // const { file } = req;
    // const urlImage = `http://localhost:4000/${file.path}`;
    const newProducts = await Product.create(
     { nameProduct, color, price, description, pictures:uploadPictures},
    // req.body,
    //   {
    //     include:{
    //       model:Images,
    //       as: 'idImagesProduct'
    //     }
    //   },
    );
    res.status(200).send(newProducts);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
const getAllProducts = async (req, res) => {
  const getAll = await Product.findAll({include:["idImagesProduct"]});
  try {
    res.status(200).send(getAll);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getOneProducts = async (req, res) => {
  const { id } = req.params;
  const getOne = await Product.findOne({ where: { id } });
  try {
    res.status(200).send(getOne);
  } catch (err) {
    res.status(200).send(err);
  }
};
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { nameProduct, color, price, description } = req.body;
  const updateUsers = await Product.update(
    { nameProduct, color, price, description },
    { where: { id } }
  );
  try {
    res.status(200).send(updateUsers);
  } catch (err) {
    res.status(200).send(err);
  }
};
const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const deleUsers = await Product.destroy({ where: { id } });
  try {
    res.status(200).send(deleUsers, `${id}`);
  } catch (err) {
    res.status(200).send(err);
  }
};
const fillPriceMax = async (req,res) => {
    const fillMax = await Product.findAll({
        order: [["price","DESC"]]
    });
    try{
      if (fillMax) {
        res.send(fillMax);
      }
    }
    catch (err){
      res.send(err);
      console.log(err);
    }
};
const fillPriceMin = async (req,res) => {
    const fillMin = await Product.findAll({
      order: [["price","ASC"]]
    });
    try{
      if (fillMin) {
        res.send(fillMin);
      }
    }
    catch (err){
      res.send(err);
      console.log(err);
    }
};
const paginationProducts = async(req,res) =>{
  const pageAsNumber = Number.parseInt(req.params.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber;
  }

  let size = 6;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 6) && !(sizeAsNumber < 1)){
    size = sizeAsNumber;
  }

  const productsWithCount = await Product.findAndCountAll({
    limit: size,
    offset: page * size
  });
  res.send({
    content: productsWithCount.rows,
    totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
  });
}
module.exports = {
  createProducts,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
  fillPriceMin,
  fillPriceMax,
  paginationProducts
};
