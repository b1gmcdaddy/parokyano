const express = require("express");
const router = express.Router();

const {
  retrieveByParams,
  retrieveSchedules,
} = require("../controllers/priestController");

router.get("/retrieve", retrieveByParams);
router.get("/retrieve-schedule", retrieveSchedules);

module.exports = router;
