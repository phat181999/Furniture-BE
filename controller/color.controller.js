const { color } = require('../models');

const createColors = async(req,res) =>{
    const { nameColor, colorCode} = req.body;
    try{
        const newColors = await color.create({nameColor, colorCode});
        res.status(200).send(newColors);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const getAllColors = async(req,res) =>{
    const getAll = await color.findAll({});
    try{
        res.status(200).send(getAll);
    }
    catch(err)
    {
        res.status(200).send(err);
    }
};
const getOneColors= async(req,res) =>{
    const {id} = req.params;
    const getOne = await color.findOne({where:{id}});
    try{
        res.status(200).send(getOne);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const updateColors = async(req,res)=>{
    const {id} = req.params;
    const {nameColor, colorCode} = req.body;
    const updateNews = await TypeProduct.update({nameColor, colorCode},{where:{id}});
    try{
        res.status(200).send(updateNews);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const deleColors = async(req,res)=>{
    const {id} = req.params;
    const dele = await color.destroy({where:{id}});
    try{
        res.status(200).send(dele);
    }
    catch(err){
        res.status(200).send(err);
    }
};

module.exports = {
    createColors,
    getAllColors,
    getOneColors,
    updateColors,
    deleColors
}