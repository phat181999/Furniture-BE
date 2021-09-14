const { colors } = require('../models');

const createColors = async(req,res) =>{
    const { nameColor, colorCode} = req.body;
    try{
        const newColors = await colors.create({nameColor, colorCode});
        res.status(200).send(newColors);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const getAllColors = async(req,res) =>{
    const getAll = await colors.findAll({});
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
    const getOne = await colors.findOne({where:{id}});
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
    const updateNews = await colors.update({nameColor, colorCode},{where:{id}});
    try{
        res.status(200).send(updateNews);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const deleColors = async(req,res)=>{
    const {id} = req.params;
    const dele = await colors.destroy({where:{id}});
    try{
        res.status(200).send(dele);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const handleMultipleColors=async(req,res)=>{
     const {oldColors,newColors}=req.body 
     try {
        const listColors = await colors.findAll({}); 
        await  listColors.forEach(element => { //loop list colors
            const {nameColor,colorCode,id}=element
            oldColors?.some(color=> color?.id === element.id) //some method allow check each  item of array
                 ? colors.update({nameColor, colorCode},{where:{id}}) //if found id of colors, upadte color
                 : colors.destroy({where:{id}}); //else did'nt find id of colors , delete color
        });
        //insert new array colors
        await  newColors.forEach(element => {
            const {nameColor,colorCode}=element
             colors.create({nameColor, colorCode});
        });
        res.send({message:"Lưu Thành Công"})
     } catch (error) {
         res.status(400).send(error)
     }
  
}

module.exports = {
    createColors,
    getAllColors,
    getOneColors,
    updateColors,
    deleColors,
    handleMultipleColors
}