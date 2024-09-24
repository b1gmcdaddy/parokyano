const express = require("express");
const router = express.Router();

const {
  retrieveByParams,
  retrieveSchedules,
  createPriest,
  createSchedule,
  editPriest,
  editSchedule,
  deleteSchedule,
} = require("../controllers/priestController");

router.get("/retrieve", retrieveByParams);
router.get("/retrieve-schedule", retrieveSchedules);
router.post("/createPriest", createPriest);
router.post("/createPriestSched", createSchedule);
router.put("/editPriest", editPriest);
router.put("/editSched", editSchedule);
router.delete("/deleteSched", deleteSchedule);

module.exports = router;
