const {order,Product} = require('../models');

const newsOrder = async (req,res) =>{
    const listProductsID = req.body.listProductsID;
    const billsOrderID = req.body.billsOrderID;
    const { quantity } = req.body;
    order.create(
        {billsOrderID,quantity,listProductsID},
    )
    .then(data => {
        res.json({data: data})
    }).catch(err => {
        throw err
    })
};
const getOrders = async (req,res) =>{
    order.findAll({include:{model: Product, as: 'listProducts'}})
    .then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
};
const updateStatus = async(req,res) =>{
    const {id} = req.params;
    const {cartStatus} = req.body;
    try{
        await order.update({cartStatus}, {where: {id}})
        let idProduct = 0;
        let totalQuantity = 0;
        let quantityProducts = 0;

        await order.findOne({ where:{id},include: [{model : Product ,as: 'orderProduct'}]}).then((data) => {
            idProduct=data.orderProduct.id
            totalQuantity=data.totalQuantity
        })
        .catch((er) => {
            throw er;
        });
        await Product.findOne({ where:{ id: idProduct }}).then((data) => {
            quantityProducts = data.quantityProducts;
        })
        .catch((er) => {
            throw er;
        });
         
        if(  cartStatus === 'success', quantityProducts, totalQuantity ){
            try{
                const subtraction = parseInt(quantityProducts) - parseInt(totalQuantity)
                await Product.update({quantityProducts:subtraction},{where:{id:idProduct}})  
                .then((data) => {
                    data})
                .catch((er) => {
                    throw er;
                });                                              
            }
            catch(err){
                res.status(400).send(err)
                console.log(err,'err');
            }
        }
        if( cartStatus === 'fail'){
            res.send('Fail')
        }
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};


module.exports = {
    newsOrder,
    getOrders,
    updateStatus
}