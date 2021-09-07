const express = require("express");
const checkoutExpress = express.Router();
const {
  CheckOutCart,
  getCheckOutUser,
  updateProductsCheckout,
  changeStatus,
} = require("../controller/checkout.controller");
const { authenticate } = require("../middlewares/Authenticate/authenticate");
const { authorize } = require("../middlewares/Authenticate/authorize");

checkoutExpress.post("/check-out-cart", authenticate, CheckOutCart);
checkoutExpress.get("/get-check-out-user", authenticate, getCheckOutUser);
checkoutExpress.put(
    "/test-check-out-user/:id",
    authenticate,
    authorize(["admin"]),
    changeStatus
  );
checkoutExpress.put("/expect-checkout/:id", updateProductsCheckout);


module.exports = { checkoutExpress };
