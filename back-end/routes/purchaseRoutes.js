const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

router.route("/").post(purchaseController.checkOut)
router.route("/callback").post(purchaseController.callback)
module.exports = router;
