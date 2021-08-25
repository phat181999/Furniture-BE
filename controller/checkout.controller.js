const { checkOut, User } = require('../models');

const CheckOutCart = async (req,res) => {
    const {user} = req;
    const checkOutUserId = user.id;
    const checkOutCartId = req.body.checkOutCartId;
    const { address,zipcode,numberPhone } = req.body;
    checkOut.create({ address,zipcode,numberPhone,checkOutUserId,checkOutCartId })
    .then(data =>{ res.json({data: data})
    }).catch(err =>{
        throw err
    })
};
const getCheckOutUser = async (req,res) =>{
    const {user} = req;
    User.findAll({
        where:{ id: user.id},
        include:[{model: checkOut, as: 'IdCheckOutUser'}]
    })
    .then(data =>{
        res.json({data:data});
    })
    .catch(err =>{
        throw err;
    })
}

module.exports = {
    CheckOutCart,
    getCheckOutUser
}