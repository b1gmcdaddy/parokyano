const express = require("express");
const router = express.Router();
const {
  retrieveByParams,
  updateRequirements,
  updateWeddingDetails,
  updateBulk,
} = require("../controllers/weddingController");

router.get("/retrieve", retrieveByParams);
router.put("/requirements/:id", updateRequirements);
router.put("/updateWedding/:requestID", updateWeddingDetails);
router.put("/update-bulk", updateBulk);

module.exports = router;
