const { User, carts, Product } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUsers = async (req, res) =>
{
  const { fullname, account, password, address, phone, type } = req.body;
  try
  {
    const { file } = req;
    const urlImage = file ? `http://localhost:5000/${file.path}` : "";
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUsers = await User.create({
      fullname,
      account,
      password: hashPassword,
      avatar: urlImage,
      address,
      phone,
      type
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
  const { id } = req.params;
  const getOne = await User.findOne({ where: { id } });
  try
  {
    res.status(200).send(getOne);
  } catch (err)
  {
    res.status(200).send(err);
  }
};
const updateuser = async (req, res) =>
{
  const { id } = req.params;
  const { fullname, account, password, address, phone } = req.body;
  const updateUsers = await User.update(
    { fullname, account, password, address, phone },
    { where: { id } }
  );
  try
  {
    res.status(200).send(updateUsers);
  } catch (err)
  {
    res.status(200).send(err);
  }
};
const loginUsers = async (req, res) =>
{
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
<<<<<<< HEAD
}
=======
};

>>>>>>> 3f183ba46d27e84b2b528799ae7f7f314f1cbcc9
module.exports = {
  createUsers,
  getAll,
  loginUsers,
  getOneUser,
  updateuser,
  deleteUser,
  getCart
};
