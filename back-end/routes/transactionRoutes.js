const express = require("express");
const checkTransactionController = require("../controllers/checkTransactionController");
const router = express.Router();
const authController = require("../controllers/authController");

// router.use(authController.isLoogedIn);

router.post("/", checkTransactionController.checkTransactionConfirmationTeron);



module.exports = router;
