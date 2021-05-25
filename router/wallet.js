const express = require("express");
const router = express.Router();
const wallletController = require("../controllers/wallet.controller");

router.post("/add/", wallletController.addWallet);
router.post("/sell/", wallletController.sellCrypto);

module.exports = router;
