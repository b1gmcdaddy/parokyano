const express = require("express");
const router = express.Router();

const {
  retrieveAll,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.post("/create", createAnnouncement);
router.get("/retrieve-all", retrieveAll);
router.put("/edit/:id", editAnnouncement);
router.delete("/delete/:announcementID", deleteAnnouncement);

module.exports = router;
