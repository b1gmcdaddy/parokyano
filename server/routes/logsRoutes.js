const express = require("express");
const router = express.Router();
const { createLog, retrieveAll } = require("../controllers/logsController");

router.post("/create", createLog);
router.get("/retrieveAll", retrieveAll);

module.exports = router;
