const express = require("express");
const cartRouter = express.Router();
const {
  newsCarts,
  getCart,
  checkOutCart,
} = require("../controller/cart.controller");
const { authenticate } = require("../middlewares/Authenticate/authenticate");
const { authorize } = require("../middlewares/Authenticate/authorize");

cartRouter.post("/news-cart", authenticate, authorize(["user"]), newsCarts);
cartRouter.get("/get-cart", authenticate, authorize(["user"]), getCart);
cartRouter.put("/check-out-cart", authenticate, authorize(["user"]), checkOutCart);

module.exports = { cartRouter };
