const { Product, TypeProduct } = require("../models");
const { Op } = require("sequelize");

const createProducts = async (req, res) => {
  const { nameProduct, color, price, description, productFlowTypeID } = req.body;
  try {
    const { file } = req;
    const urlImage = `http://localhost:4000/${file.path}`;
    const newProducts = await Product.create(
     { nameProduct, color, price, description, pictures:urlImage, productFlowTypeID},
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

  const pageAsNumber = Number.parseInt(req.params.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  // số trang bắt đầu
  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber;
  }

  // số sản phẩm trong 1 trang
  let size = 6;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 6) && !(sizeAsNumber < 1)){
    size = sizeAsNumber;
  }
  const productsWithCount = await Product.findAndCountAll({
    limit: size,
    offset: page * size,
    order: [["price","DESC"]]
  });
    
  try{
    if(productsWithCount){
      res.send({
        content: productsWithCount.rows,
        totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
      });
    }
    else{
      res.send({
        content: productsWithCount.rows,
        totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
      });
      const getAll = await Product.findAll({
        
      });
      res.status(200).send(getAll);
    }
  }
  catch (err){
    res.send(err);
    console.log(err);
  }

};
// phân trang theo gia 1
const fillPriceMin = async (req,res) => {
    const pageAsNumber = Number.parseInt(req.params.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    // số trang bắt đầu
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }

     // số sản phẩm trong 1 trang
    let size = 6;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 6) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }

    const productsWithCount = await Product.findAndCountAll({
      limit: size,
      offset: page * size,
      order: [["price","ASC"]]
    });

    try{
      if(productsWithCount){
        res.send({
          content: productsWithCount.rows,
          totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
        });
      }
      else{
        res.send({
          content: productsWithCount.rows,
          totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
        });
        const getAll = await Product.findAll({
          
        });
        res.status(200).send(getAll);
      }
    }
    catch (err){
      res.send(err);
      console.log(err);
    }
};
// phân trang
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
};
// lọc theo màu
const filterColor = async(req,res) =>{
  
    const pageAsNumber = Number.parseInt(req.params.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const { color } = req.params;

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
      offset: page * size,
      where:{
        color: {
          [Op.like]: `%${color}%`,
        }
      }
    });

    try{
      if(productsWithCount){
        res.send({
          content: productsWithCount.rows,
          totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
        });
      }
      else{
        res.send({
          content: productsWithCount.rows,
          totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
        });
        const getAll = await Product.findAll({
          
        });
        res.status(200).send(getAll);
      }
    }
    catch(err){
      res.status(500).send(err);
      console.log(err);
    }
};

module.exports = {
  createProducts,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
  fillPriceMin,
  fillPriceMax,
  paginationProducts,
  filterColor,
  
};
