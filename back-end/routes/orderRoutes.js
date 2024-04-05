const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");

// router.use(authController.protect);
// router.use(authController.restrictTo("admin"));
router.route("/").post(orderController.getMyProducts);
router
  .route("/:id")
  .get(orderController.getMyProduct)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
