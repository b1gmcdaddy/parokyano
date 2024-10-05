const express = require("express");
const router = express.Router();
const { retrieveByParams } = require("../controllers/weddingController");

router.get("/retrieve", retrieveByParams);

module.exports = router;
