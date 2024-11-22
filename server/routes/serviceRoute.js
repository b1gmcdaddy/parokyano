const express = require("express");
const router = express.Router();

const {
  retrieveAll,
  retrieveByParams,
  retrieveSchedule,
  updateService,
} = require("../controllers/serviceController");

router.get("/retrieve-all", retrieveAll);
router.get("/retrieveByParams", retrieveByParams);
router.get("/retrieve-schedule", retrieveSchedule);
router.put("/update-service", updateService);

module.exports = router;
