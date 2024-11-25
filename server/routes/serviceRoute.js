const express = require("express");
const router = express.Router();

const {
  retrieveAll,
  retrieveByParams,
  retrieveSchedule,
  updateService,
  getCountReq,
} = require("../controllers/serviceController");

router.get("/retrieve-all", retrieveAll);
router.get("/retrieveByParams", retrieveByParams);
router.get("/retrieve-schedule", retrieveSchedule);
router.put("/update-service", updateService);
router.get("/getCountReqPerMonth", getCountReq);

module.exports = router;
