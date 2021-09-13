const { Suppliers }  = require('../models');


const createSupplier =  async ( req, res) =>{
    
    await Suppliers.create(req.body)
    .then(( data ) =>{
        res.send(data)
    })
    .catch(( err ) =>{
        res.send(err)
    })
    
};

const getInformation = async (req, res) => {
    
    await Suppliers.findAll({})
    .then(( data ) =>{
        res.send(data)
    })
    .catch(( err ) =>{
        res.send(err)
    })
};

const deleteSupplier = async (req, res) =>{
    
    const { id } = req.params;
    
    await Suppliers.destroy({ where: { id }})
    .then(( data) => {
        res.send(data)
    })
    .catch(( err ) =>{
        res.send(err)
    })
}


module.exports = {
    createSupplier,
    getInformation,
    deleteSupplier
}