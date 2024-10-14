const express = require("express");
const router = express.Router();
const { login, token, logout } = require("../controllers/authController");

router.post("/login", login);
router.post("/token", token);
router.post("/logout", logout);

module.exports = router;
