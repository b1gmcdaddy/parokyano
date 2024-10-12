const express = require("express");
const router = express.Router();
const {
  retrieveByParams,
  updateRequirements,
} = require("../controllers/weddingController");

router.get("/retrieve", retrieveByParams);
router.put("/requirements/:wedding_id", updateRequirements);

module.exports = router;
