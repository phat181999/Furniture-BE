const { bill, Product, orders: mOrders } = require('../models');
var moment = require('moment'); 

const { Op } = require("sequelize");
const createBill = async (req,res) => {

    const {user} = req;
    const userID = user.id;
    const { status,totalMoney, orders } = req.body;

    try{
        const resBill = await bill.create({ status,userID,totalMoney });
        if (resBill?.id) {
            let data = [];
            for (let item of orders) {
                data.push({
                    listProductsID: item?.productID,
                    billsOrderID: resBill?.id,
                    quantity: item?.quantity || 0
                });
            }
            await mOrders.bulkCreate(data); // bulkCreate insert many data one time
        }
        res.send(resBill);
    }
    catch(err){
        res.send(err);
    }
};

const getBills = async (req,res) =>{
    
    const {user} = req;

    await bill.findAll({
        where:{ userID: user.id, }, include:['billsUser','productsList']
    })
    .then(data =>{
        res.json({data:data});
    })
    .catch(err =>{
        throw err;
    })
};

const changeStatus = async(req,res) =>{

    const {id} = req.params;
    const {status} = req.body;

    try{
        await bill.update({status}, {where: {id}}) // update bill flow status

        let quantity = []; // initialization quantity in object orders
        let quantityProducts = []; // initialization quantityProducts in array productsList
        let arrQuantity = []

        // findOne quantity and idProduct in array productsList
        await bill.findOne({ where:{ id}, include:['productsList']} )
         .then(data =>{
             res.json({data:data});
            for (let i = 0; i < data.productsList.length; i++) { // get id product in productsList
                const element = data.productsList[i];
                let id=element.id
                let quantity=element.orders?.quantity || 0;
                let quantityProducts=element.quantityProducts || 0;
                arrQuantity.push({id,quantity,quantityProducts})
            }

         })
         .catch(err =>{
             throw err;
         })      

        if(  status === 'SUCCESS', quantityProducts, quantity ){

            try{
                for (let i = 0; i < arrQuantity.length; i++) {
                    const element = arrQuantity[i];
                    const subtraction = parseInt(element.quantityProducts) - parseInt(element.quantity)
                    await Product.update({quantityProducts:subtraction},{where:{id:element.id}})  
                    .then(( data ) => { data })
                    .catch(( er ) => {
                        throw er;
                    });  
                }                                           
            }
            catch(err){
                res.status(401).send(err)
                console.log(err,'err');
            }
        }

        if( status === 'FAIL'){
            res.send('FAIL')
        }

        if( status === 'PENDING'){
            res.send('PENDING')
        }
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
    }
};

const statisticalMoney = async( req, res ) =>{

    // const startDate = moment(new Date()).startOf('month').toDate();
    // const endDate = moment(new Date()).endOf('month').toDate();
    // ,{'created_at':{$gte: startDate, $lte: endDate}}
    let total = 0;

    await bill.findAll({ attributes:[ 'totalMoney']})
    .then(( data ) =>{

        for ( let i = 0; i < data.length;  i++){
            totalMoney =  data[i].totalMoney;         
            total += totalMoney;   
        }
        res.send( (total).toString() );
    })
    .catch(( err ) =>{
        res.send(err);
    })

};

const statisticalQuantity = async ( req, res ) =>{
    
    let totalQuantity = 0;

    await mOrders.findAll({ attributes: ['quantity'] })
    .then(data =>{
        for( let i = 0; i < data.length; i++){
            quantity = data[i]?.quantity;
            totalQuantity += quantity;
        }
        res.send( (totalQuantity).toString() );
    })
    .catch(err =>{
        console.log(err);
        throw err;
    })
};

const statitiscalQuantityProduct = async ( req, res ) =>{
    
    let totalQuantityProducts = 0;
    let { search } = req.query;
    let data = [];
    let quantity = [];

   try{
    await mOrders.findAll({ 
        include: [ "productsList" ],
        })

    .then(data =>{
        for( let i = 0; i < data.productsList?.length; i++){
            const element = data.productsList[i];
            console.log(element);
        }
    })
    .catch(err =>{
        console.log(err);
        throw err;
    })
   }
   catch(err){
       res.send(err)
   }
}
module.exports = {
    createBill,
    getBills,
    changeStatus,
    statisticalMoney,
    statisticalQuantity,
    statitiscalQuantityProduct
}