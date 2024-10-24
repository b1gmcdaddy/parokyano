const express = require("express");
const router = express.Router();

const {
  retrieveAllUsers,
  retrieveByParams,
  createUser,
  editUser,
  getUsersWithLatestActivity,
} = require("../controllers/userController");

router.get("/retrieveUsers", retrieveAllUsers);
router.get("/retrieve", retrieveByParams);
router.post("/createUser", createUser);
router.put("/editUser/:id", editUser);
router.get("/retrieveUsersWithActivity", getUsersWithLatestActivity);

module.exports = router;
