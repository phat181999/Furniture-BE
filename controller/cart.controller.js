const {carts,Product,User} = require('../models');

const newsCarts = async (req,res) =>{
    const {user} = req;
    const userId = user.id;
    const productCartId = req.body.productCartId;
    const { totalMoney,totalQuantity } = req.body;
    carts.create({userId,productCartId,totalQuantity,totalMoney}).then(data => {
        res.json({data: data})
    }).catch(err => {
        throw err
    })
};
const getCart = async (req,res) =>{
    const {user} = req;
    User.findAll({ 
            where: { id: user.id },
            include:[{model: carts, as: 'idUserCart'}]           
        })
    .then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
};

module.exports = {
    newsCarts,
    getCart,
}