const express = require("express");
const router = express.Router();
const {sendSMS} = require("../controllers/smsController");

router.post("/send-sms", sendSMS);

module.exports = router;
