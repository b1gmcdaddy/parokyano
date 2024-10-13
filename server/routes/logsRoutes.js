const express = require("express");
const router = express.Router();
const {createLog, retrieveAllLogs} = require("../controllers/logsController");

router.post("/create", createLog);
router.get("/retrieve-all", retrieveAllLogs);

module.exports = router;
