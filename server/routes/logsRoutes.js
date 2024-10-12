const express = require("express");
const router = express.Router();
const { createLog } = require("../controllers/logsController");

router.post("/create", createLog);

module.exports = router;
