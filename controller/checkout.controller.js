const { checkOut, User, Product } = require('../models');

const CheckOutCart = async (req,res) => {

    const {user} = req;
    const checkOutUserId = user.id;
    const { address,zipcode,numberPhone,quantityCheckOut,productCheckoutId,totalMoney } = req.body;
    try{
        const stepSuccess = await checkOut.create({ address,zipcode,numberPhone,checkOutUserId,productCheckoutId,quantityCheckOut,totalMoney });
        res.send(stepSuccess)
    }
    catch(err){
        res.send(err)
    }
};
const getCheckOutUser = async (req,res) =>{
    const {user} = req;
    await User.findOne({
        where:{ id: user.id},
        include:[{model: checkOut, as: 'IdCheckOutUser'}]
    })
    .then(data =>{
        res.json({data:data});
    })
    .catch(err =>{
        throw err;
    })
};
const changeStatus = async(req,res)=>{
    const {id} = req.params;
    const {checkoutStatus} = req.body;
    try{
        await checkOut.update({checkoutStatus}, {where: {id}})
        const oldProducts = await Product.findAll({})
       
         const boughtItemOrder = await checkOut.findOne({ where:{id},include: [{model : Product ,as: 'idOfProduct'}]})
        //  res.send(boughtItemOrder)
        //  const { productCheckoutId } = req.params;
        //  const { quantityProducts } = req.Product;
        //  const { quantityCheckOut, checkoutStatus } = req.checkOut;
        if( checkoutStatus === 'success', quantityCheckOut, quantityProducts){
            try{
                for(let i=0; i <=boughtItemOrder.lenght; i++ ){
                    if( boughtItemOrder.productCheckoutId[i].id === oldProducts[i].id){    
                         await Product.update(
                            {where:{id:oldProducts[i].id}},
                            {quantityProducts:oldProducts[i]?.quantityProducts - boughtItemOrder?.productCheckoutId[i]?.quantityProducts})            
                       
                         console.log(updateCheckout,'updateCheckout');
                     }
                 }
                  res.send("thanh cong")
            }
            catch(err){
                res.send(err)
            }
        }
        if( checkoutStatus === 'fail'){
            res.send('Fail')
        }
    }
    catch(err){
        res.send(err)
        console.log(err);
    }
};
const updateProductsCheckout = async(req,res)=>{
    const oldProducts = await Product.findAll({})
    const boughtItemOrder = await checkOut.findOne({ where:{id}})
    const { id } = req.params.Product;
    const { quantityProducts } = req.body.Product;
    const { quantityCheckOut, checkoutStatus } = req.body.checkOut;

    try{
        if ( checkoutStatus === 'success'){
            for(let i=0; i <=boughtItemOrder.lenght; i++ ){
               if( boughtItemOrder[i].id==oldProducts[i].id){
                    const updateCheckout = await Product.update(
                                        {where:{id:boughtItemOrder[i].id}},
                                        {quantityProducts:oldProducts[i].quantityProducts- boughtItemOrder[i].quantityProducts})
                    res.send(updateCheckout)
                }
            }
            console.log('test');
        }
        if( checkoutStatus === 'fail'){
            res.send('Fail')
        }
    }
    catch(err){
        res.send(err)
    }
    
};

module.exports = {
    CheckOutCart,
    getCheckOutUser,
    updateProductsCheckout,
    changeStatus
}