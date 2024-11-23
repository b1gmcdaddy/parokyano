const express = require("express");
const router = express.Router();

const { getIntentionCount } = require("../controllers/configurationController");

router.get("/intentionCount", getIntentionCount);

module.exports = router;
