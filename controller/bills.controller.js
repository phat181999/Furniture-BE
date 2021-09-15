const { bill, Product, orders: mOrders } = require('../models');

const createBill = async (req,res) => {

    const {user} = req;
    const userID = user.id;
    const { totalMoney, orders,zipcode,addresss,numberPhone } = req.body;
    try{
         const resBill = await bill.create({ zipcode,userID,totalMoney,numberPhone ,addresss});
        if (resBill?.id) {
            let data = [];
            for (let item of orders) {
                data.push({
                    listProductsID: item?.id,
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

        let idProduct = []; // get all id Products in array productsList
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

        console.log(arrQuantity);
        for (let i = 0; i < arrQuantity.length; i++) {
            const element = arrQuantity[i];
            const subtraction = parseInt(element.quantityProducts) - parseInt(element.quantity)
            console.log(subtraction);
        }

        if(  status === 'SUCCESS', quantityProducts, quantity ){

            try{
                for (let i = 0; i < arrQuantity.length; i++) {
                    const element = arrQuantity[i];
                    const subtraction = parseInt(element.quantityProducts) - parseInt(element.quantity)
                    console.log(subtraction);
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
module.exports = {
    createBill,
    getBills,
    changeStatus
}