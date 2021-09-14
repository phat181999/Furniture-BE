const { User, carts, Product } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var gravatarUrl = require('gravatar');
const { cloudinary } = require('../untils/cloundinary');

const createUsers = async (req, res) => {
  const { fullname,account, password, address, phone,type,email } = req.body;
  try {   
    const { file } = req;
    const emailAvatar = gravatarUrl.url(email);
    const urlImage = file ?`http://localhost:5000/${file.path}` : emailAvatar;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUsers = await User.create({
      fullname,
      account,
      password: hashPassword,
      avatar: urlImage,
      address,
      phone,
      type,
      email
    });
    res.status(200).send(newUsers);
  } catch (err)
  {
    res.status(500).send(err);
    console.log(err);
  }
};
const getAll = async (req, res) =>
{
  const getAll = await User.findAll({});
  try
  {
    res.status(200).send(getAll);
  } catch (err)
  {
    res.status(500).send(err);
  }
};
const getOneUser = async (req, res) =>
{
  const { account } = req.params;
  const getOne = await User.findOne({ where: { account } });
  try
  {
    res.status(200).send(getOne);
  } catch (err)
  {
    res.status(200).send(err);
  }
};
const updateuser = async (req, res) => {
    const { file } = req;
    const urlImage = file ? `http://localhost:4000/${file.path}` : req.body.avatarUser;
    const { fullname, account, address, phone,email } = req.body;

   
  const updateUsers = await User.update(

    {

       fullname:fullname?"":fullname,
       email,
       address:address ? address:"" ,
       phone:parseInt(phone) ? phone : null, 
       avatar: urlImage, 

    },
    { where: { account } }
    );
    try
    {
      res.status(200).send( {message: "Update Thành Công",updateUsers});
    } catch (err)
    {
      res.status(400).send({message: "Có Lỗi Xảy Ra"});
    }
};
const loginUsers = async (req, res) => {
  const { account, password } = req.body;
  const user = await User.findOne({
    where: {
      account,
    },
  });
  if (user)
  {
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth)
    {
      const token = jwt.sign({ type: user.type, id: user.id }, "tan-phat-99", {
        expiresIn: 120 * 60,
      });
      console.log(token, "token");
      res.status(200).send({ message: "Đăng nhập thành công", token, user });
    } else
    {
      res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng 1" });
    }
  } else
  {
    res.status(400).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
  }
};
const deleteUser = async (req, res) =>
{
  const { id } = req.params;
  const deleUsers = await User.destroy({ where: { id } });
  try
  {
    res.status(200).send(deleUsers);
  } catch (err)
  {
    res.status(200).send(err);
  }
};
const getCart = async (req, res) =>
{
  const { user } = req;
  User.findAll(
    {
      where: { id: user.id },
      include: [{ model: Product, as: 'idOfProduct', include: [{ model: carts, as: 'idUserCart' }] }]
    }).then(data =>
    {
      res.json({ data: data })
    }).catch(err =>
    {
      throw err;
    })
};

module.exports = {
  createUsers,
  getAll,
  loginUsers,
  getOneUser,
  updateuser,
  deleteUser,
  getCart
};
