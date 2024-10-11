const express = require("express");
const router = express.Router();
const {
  retrieveByParams,
  updateBulk,
} = require("../controllers/baptismController");

router.get("/retrieve", retrieveByParams);
router.put("/update-bulk", updateBulk);

module.exports = router;
