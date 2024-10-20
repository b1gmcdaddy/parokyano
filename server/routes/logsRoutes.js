const express = require("express");
const router = express.Router();
const {
  createLog,
  retrieveAll,
  retrieveAllLogs,
  getCountLogs,
} = require("../controllers/logsController");

router.post("/create", createLog);
router.get("/retrieveAll", retrieveAll);
router.get("/retrieve-all", retrieveAllLogs);
router.get("/count", getCountLogs);

module.exports = router;
