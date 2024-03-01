const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");

// router.use(authController.protect);
// router.use(authController.restrictTo("admin"));
router.route("/").get(orderController.getAllOrders);
router
  .route("/:id")
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

  module.exports = router;
