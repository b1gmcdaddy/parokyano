const express = require("express");
const router = express.Router();
const {
  login,
  token,
  logout,
  // sendResetEmail,
  requestPasswordReset,
  changePass,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/token", token);
router.post("/logout", logout);
router.post("/request-password-reset", requestPasswordReset);
router.post("/change-password", changePass);
// router.post("/reset-password", resetPassword);

module.exports = router;
