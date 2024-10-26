const express = require("express");
const router = express.Router();
const {retrieveByParams, addConfirmationRecord} = require("../controllers/confirmationController");

router.get("/retrieve", retrieveByParams);
router.post("/add-record", addConfirmationRecord)

module.exports = router;
