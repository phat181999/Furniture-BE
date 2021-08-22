const { Product, Images } = require("../models");

const createProducts = async (req, res) => {
<<<<<<< HEAD
  const { nameProduct, color, price } = req.body;
  try {
    // const { file } = req;
    // const urlImage = `http://localhost:4000/${file.path}`;
    const newProducts = await Product.create(
     { nameProduct, color, price},
=======
  const { nameProduct, color, price, description } = req.body;
  try {
    const { file } = req;
    const urlImage = `http://localhost:4000/${file.path}`;
    const newProducts = await Product.create(
     { nameProduct, color, price, description, pictures:urlImage},
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
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
<<<<<<< HEAD
  const { nameProduct, color, price } = req.body;
  const updateUsers = await Product.update(
    { nameProduct, color, price },
=======
  const { nameProduct, color, price, description } = req.body;
  const updateUsers = await Product.update(
    { nameProduct, color, price, description },
>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
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
module.exports = {
  createProducts,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
};
