const {TypeProduct} = require('../models');

const createTypeProduct = async(req,res) =>{
    const {nameTypeProduct} = req.body;
    try{
        const { file } = req;
        const urlImage = `http://localhost:4000/${file.path}`;
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
    const {nameTypeProduct} = req.body;
    const updateNews = await TypeProduct.update({nameTypeProduct},{where:{id}});
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
        res.status(200).send({mess:"xoa thanh cong"});
    }
    catch(err){
        res.status(200).send(err);
    }
};

module.exports = {
    createTypeProduct,
    getAllTypeProduct,
    getOneTypeProduct,
    updateTypeProduct,
    deleTypeProduct
}