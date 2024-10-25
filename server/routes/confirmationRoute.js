const express = require("express");
const router = express.Router();
const {retrieveByParams} = require("../controllers/confirmationController");

router.get("/retrieve", retrieveByParams);

module.exports = router;
