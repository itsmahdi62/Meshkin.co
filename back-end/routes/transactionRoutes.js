const express = require("express");
const btcTransationController = require("../controllers/checkTransactionController/btcTransationController");
const ethTransationController = require("../controllers/checkTransactionController/ethTransationController");
const teronTransationController = require("../controllers/checkTransactionController/teronTransationController");
const cardanoTransationController = require("../controllers/checkTransactionController/cardanoTransationController");
const router = express.Router();
const authController = require("../controllers/authController");

// router.use(authController.isLoogedIn);

router.post("/Btc", btcTransationController.btcTransationController);
router.post("/Eth", ethTransationController.ethTransationController);
router.post("/Trx", teronTransationController.teronTransationController);
router.post("/Ada", cardanoTransationController.cardanoTransationController);

module.exports = router;
