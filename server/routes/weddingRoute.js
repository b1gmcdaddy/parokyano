const express = require("express");
const router = express.Router();
const {
  retrieveByParams,
  updateRequirements,
  updateWeddingDetails,
} = require("../controllers/weddingController");

router.get("/retrieve", retrieveByParams);
router.put("/requirements/:id", updateRequirements);
router.put("/updateWedding/:requestID", updateWeddingDetails);

module.exports = router;
