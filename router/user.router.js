const express = require("express");
const userRouter = express.Router();
const {
  createUsers,
  getAll,
  loginUsers,
  getOneUser,
  updateuser,
  deleteUser,
  getCart,
} = require("../controller/user.controller");
const { uploadImage } = require("../middlewares/upload/upload-image");
const { authenticate } = require("../middlewares/Authenticate/authenticate");
const { authorize } = require("../middlewares/Authenticate/authorize");
const { authenSocial } = require("../middlewares/Authenticate/authenticateSocial");


userRouter.post("/login-user-social", authenSocial, loginUsers);
userRouter.post("/create-user", uploadImage("avatarUser"), createUsers);
userRouter.get("/get-all-user", authorize(["admin"]), getAll);
userRouter.post("/login-user", loginUsers);
userRouter.get("/get-one-user/:account",authenticate, getOneUser);
userRouter.put("/update-user",authenticate,uploadImage("avatarUser"), updateuser); //,authenticate,uploadImage("avatarUser")
userRouter.delete("/delete-user/:id", authorize(["admin"]), deleteUser);
userRouter.get("/get-cart-user", authenticate, authorize(["user"]), getCart);
module.exports = { userRouter };
