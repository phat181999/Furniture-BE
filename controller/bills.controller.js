const { bill, Product } = require('../models');

const createBill = async (req,res) => {

    const {user} = req;
    const userID = user.id;
    const { status,totalMoney } = req.body;

    try{
        const stepSuccess = await bill.create({ status,userID,totalMoney });
        res.send(stepSuccess)
    }
    catch(err){
        res.send(err)
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
        let quantity = 0; // initialization quantity in object orders
        let quantityProducts = 0; // initialization quantityProducts in array productsList

        // findOne quantity and idProduct in array productsList
        await bill.findOne({ include:[{model: Product, as: 'productsList'}] }).then((data) => {     
            
            for (let i = 0; i < data.productsList.length; i++) { // get id product in productsList
                const element = data.productsList[i];
                idProduct.push(element.id);
            }

            for (let i = 0; i < data.productsList.length; i++) { // get quantity in object orders in array productsList
                const element = data.productsList[i];
                quantity = element.orders?.quantity || 0;
            }
        })
        .catch((er) => {
            throw er;
        });

        //findOne idProduct in productsList to send table and compare like id in products
        await Product.findOne({ where:{ id: idProduct }}).then((data) => { 
            quantityProducts = data.quantityProducts; // get quantity Product
        })
        .catch((er) => {
            throw er;
        });
         
        if(  status === 'success', quantityProducts, quantity ){

            try{

                const subtraction = parseInt(quantityProducts) - parseInt(quantity)

                await Product.update({quantityProducts:subtraction},{where:{id:idProduct}})  

                .then(( data ) => { data })

                .catch(( er ) => {
                    throw er;
                });                                              
            }
            catch(err){
                res.status(401).send(err)
                console.log(err,'err');
            }
        }

        if( status === 'fail'){
            res.send('Fail')
        }

        if( status === 'peding'){
            res.send('peding')
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