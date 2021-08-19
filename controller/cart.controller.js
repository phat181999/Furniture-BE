const {carts,Product,User} = require('../models');

const newsCarts = async (req,res) =>{
    const {user} = req;
    const userId = user.id;
    const productCartId = req.body.productCartId;
    
    carts.create({userId,productCartId}).then(data => {
        res.json({data: data})
    }).catch(err => {
        throw err
    })
};
const getCart = async (req,res) =>{
    const {user} = req;
    carts.findAll(
        { where: { id: user.id },
        include:[{model: Product, as: 'idOfProduct'}] })
        .then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
};
const checkOutCart = async(req,res) =>{
    const {user} = req;
    const userId = user.id;
    const productCartId = req.body.productCartId;
    const {totalQuantity,totalMoney} = req.body;
    const checkOut = await carts.create ({totalQuantity,totalMoney,productCartId,userId});
    try{
        res.status(200).send(checkOut);
        console.log(checkOut);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
        
    }
};
module.exports = {
    newsCarts,
    getCart,
    checkOutCart
}