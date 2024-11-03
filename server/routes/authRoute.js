const express = require("express");
const router = express.Router();
const {
  login,
  token,
  logout,
  // sendResetEmail,
  requestPasswordReset,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/token", token);
router.post("/logout", logout);
router.post("/request-password-reset", requestPasswordReset);
// router.post("/reset-password", resetPassword);

module.exports = router;
