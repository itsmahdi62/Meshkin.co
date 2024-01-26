const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productsController.createProduct
  );

router
  .route("/:id")
  .get(productsController.getAllProducts)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productsController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productsController.deleteProduct
  );

module.exports = router;
