const express = require("express");
const router = express.Router();

const {
  retrieveByParams,
  retrieveSchedules,
  createPriest,
  createSchedule,
  editPriest,
  editSchedule,
  deleteSchedule2,
  retrieveScheduleByParams,
  retrieveScheduleVenue,
  reschedule,
} = require("../controllers/priestController");

router.get("/retrieve", retrieveByParams);
router.get("/retrieve-schedule", retrieveSchedules);
router.get("/retrieve-schedule-by-params", retrieveScheduleByParams);
router.get("/retrieve-schedule-venue", retrieveScheduleVenue);
router.post("/createPriest", createPriest);
router.post("/createPriestSched", createSchedule);
router.put("/editPriest/:priestID", editPriest);
router.put("/editSched/:scheduleID", editSchedule);
router.delete("/deleteSched", deleteSchedule2);
router.put("/reschedule", reschedule);

module.exports = router;
