const express = require("express");
const router = express.Router();
const {
  createLog,
  retrieveAll,
  retrieveAllLogs,
} = require("../controllers/logsController");

router.post("/create", createLog);
router.get("/retrieveAll", retrieveAll);
router.get("/retrieve-all", retrieveAllLogs);

module.exports = router;
