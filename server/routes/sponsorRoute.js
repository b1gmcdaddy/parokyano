const express = require("express");
const router = express.Router();
const {
  retrieveByParams,
  addSponsor,
  deleteSponsor,
  retrieveCount,
} = require("../controllers/sponsorController");

router.get("/retrieve", retrieveByParams);
router.post("/create-sponsor", addSponsor);
router.delete("/delete-sponsor/:sponsorID", deleteSponsor);
router.get("/retrieve-count", retrieveCount);

module.exports = router;
