const express = require("express");
const router = express.Router();

const {
  getIntentionCount,
  toggleSMS,
  getCurrentSMS,
} = require("../controllers/configurationController");

router.get("/intentionCount", getIntentionCount);
router.put("/toggleSMS", toggleSMS);
router.get("/getCurrentSMS", getCurrentSMS);

module.exports = router;
