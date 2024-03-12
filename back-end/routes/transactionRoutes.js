const express = require("express");
const btcTransationController = require("../controllers/checkTransactionController/btcTransationController");
const ethTransationController = require("../controllers/checkTransactionController/ethTransationController");
const teronTransationController = require("../controllers/checkTransactionController/teronTransationController");
const cardanoTransationController = require("../controllers/checkTransactionController/cardanoTransationController");
const router = express.Router();
const authController = require("../controllers/authController");

// router.use(authController.isLoogedIn);

router.post("/btc", btcTransationController.btcTransationController);
router.post("/eth", ethTransationController.ethTransationController);
router.post("/trx", teronTransationController.teronTransationController);
router.post("/ada", cardanoTransationController.cardanoTransationController);

module.exports = router;
