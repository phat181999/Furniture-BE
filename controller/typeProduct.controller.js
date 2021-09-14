const { TypeProduct, Product } = require('../models');

const createTypeProduct = async(req,res) =>{
    const {nameTypeProduct} = req.body;
    try{
        const { file } = req;

        const urlImage = file ? `http://localhost:4000/${file.path}` : '';

        const newType = await TypeProduct.create({nameTypeProduct,imagesTypeProduct:urlImage});
        res.status(200).send(newType);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const getAllTypeProduct = async(req,res) =>{
    const getAll = await TypeProduct.findAll({});
    try{
        res.status(200).send(getAll);
    }
    catch(err)
    {
        res.status(200).send(err);
    }
};
const getOneTypeProduct = async(req,res) =>{
    const {id} = req.params;
    const getOne = await TypeProduct.findOne({where:{id}});
    try{
        res.status(200).send(getOne);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const updateTypeProduct = async(req,res)=>{
    const {id} = req.params;
    const { file } = req;
    const {nameTypeProduct,typeproducts} = req.body;
    const urlImage = file ? `http://localhost:4000/${file.path}` : typeproducts;
    const updateNews = await TypeProduct.update({nameTypeProduct,imagesTypeProduct:urlImage},{where:{id}});
    try{
        res.status(200).send(updateNews);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const deleTypeProduct = async(req,res)=>{
  
    try{
        const {id} = req.params;
        const dele = await TypeProduct.destroy({where:{id}});
        res.status(200).send({message:"xoa thanh cong"});
    }
    catch(err){
        res.status(400).send({message:"Bạn không thể xóa danh mục này, vì có sản phẩm đang tồn tại !"});
    }
};


module.exports = {
    createTypeProduct,
    getAllTypeProduct,
    getOneTypeProduct,
    updateTypeProduct,
    deleTypeProduct,
}