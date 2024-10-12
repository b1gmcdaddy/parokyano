const express = require("express");
const router = express.Router();
const {
  retrieveByParams,
  addSponsor,
  deleteSponsor,
} = require("../controllers/sponsorController");

router.get("/retrieve", retrieveByParams);
router.post("/create-sponsor", addSponsor);
router.delete("/delete-sponsor/:sponsorID", deleteSponsor);

module.exports = router;
