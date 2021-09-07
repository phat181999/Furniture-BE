const { TypeProduct, Product } = require('../models');

const createTypeProduct = async(req,res) =>{
    const {nameTypeProduct} = req.body;
    try{
        const { file } = req;
        const urlImage = file ? `http://localhost:5000/${file.path}` : '';
        const newType = await TypeProduct.create({nameTypeProduct,imagesTypeProduct:urlImage});
        res.status(200).send(newType);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const getAllTypeProduct = async(req,res) =>{
    const getAll = await TypeProduct.findAll({});
    try{
        res.status(200).send(getAll);
    }
    catch(err)
    {
        res.status(200).send(err);
    }
};
const getOneTypeProduct = async(req,res) =>{
    const {id} = req.params;
    const getOne = await TypeProduct.findOne({where:{id}});
    try{
        res.status(200).send(getOne);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const updateTypeProduct = async(req,res)=>{
    const {id} = req.params;
    const {nameTypeProduct} = req.body;
    const updateNews = await TypeProduct.update({nameTypeProduct},{where:{id}});
    try{
        res.status(200).send(updateNews);
    }
    catch(err){
        res.status(200).send(err);
    }
};
const deleTypeProduct = async(req,res)=>{
    const {id} = req.params;
    const dele = await TypeProduct.destroy({where:{id}});
    try{
        res.status(200).send(dele);
    }
    catch(err){
        res.status(200).send(err);
    }
};
// lọc theo typeProducts
const getFlowTypeProduct = async(req,res) =>{
    const pageAsNumber = Number.parseInt(req.params.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    // số trang bắt đầu
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    // số sản phẩm trong 1 trang
    let size = 6;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 6) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
   
    const productsWithCount = await TypeProduct.findAndCountAll({
        limit: size,
        offset: page * size,
        // lấy id theo typeProducts
        where: {id: req.params.idType },
        // include model products
        include: [{
            model: Product,
            as: 'flowTypeProducts',
        }]
    });
    try{
        // nếu là productsWithCount thì sẽ chạy vào đây và phân trang và lọc theo typeProducts
        if(productsWithCount){
            res.send({
              content: productsWithCount.rows,
              totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
            });
        }
        // nếu không chọn filter theo typeProduct thì sẽ trả lại tất cả sản phẩm
        else{
            res.send({
                content: productsWithCount.rows,
                totalPages: Math.ceil(productsWithCount.count / Number.parseInt(size))
            });
            const getAll = await Product.findAll({});
            res.status(200).send(getAll);
        }
    }
    catch(err){
      res.send(err)
    }
};

module.exports = {
    createTypeProduct,
    getAllTypeProduct,
    getOneTypeProduct,
    updateTypeProduct,
    deleTypeProduct,
    getFlowTypeProduct
}