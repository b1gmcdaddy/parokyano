const jwt = require("jsonwebtoken");
const db = require("../controllers/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config();
const emailjs = require("emailjs-com");
const saltRounds = 10;

const secretKey = "please-Lord-graduate-mi";
const refreshTokenSecret = "one-God-one-church";
let refreshTokens = [];

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM user WHERE email = ?`;

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.userID, role: user.user_type },
      secretKey,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.userID, role: user.user_type },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    console.log(accessToken);

    refreshTokens.push(refreshToken);

    res.status(200).json({
      role: user.user_type,
      id: user.userID,
      accessToken,
      refreshToken,
      name: user.first_name + " " + user.last_name,
    });
  });
};

exports.token = (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign(
      { id: user.userID, role: user.user_type },
      secretKey,
      { expiresIn: "15m" }
    );
    res.json({ accessToken: newAccessToken });
  });
};

exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.sendStatus(204);
};

exports.requestPasswordReset = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  db.query("SELECT * FROM user WHERE email = ?", [email], (err, user) => {
    if (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (user.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    db.query(
      "UPDATE user SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, result) => {
        if (err) {
          console.error("Error updating user", err);
          return res.status(500).json({ message: "Database error" });
        }
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      }
    );
  });
};

exports.changePass = async (req, res) => {
  const { oldPassword, newPassword, userID } = req.body;
  console.log(userID);

  try {
    db.query(
      "SELECT password FROM user WHERE userID = ?",
      [userID],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
          return res.status(200).json({ message: "User not found" });
        }

        const currentPassword = result[0].password;

        const isMatch = await bcrypt.compare(oldPassword, currentPassword);
        if (!isMatch) {
          return res.status(200).json({ message: "Incorrect old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.query(
          "UPDATE user SET password = ? WHERE userID = ?",
          [hashedPassword, userID],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Server error" });
            }
            return res.status(200).json({ message: "success" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// const sendResetEmail = async (email, token) => {
//   const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

//   const emailParams = {
//     to_name: "User",
//     reset_link: resetLink,
//   };

//   try {
//     const response = await emailjs.send(
//       process.env.EMAILJS_SERVICE_ID,
//       process.env.EMAILJS_TEMPLATE_ID,
//       emailParams,
//       process.env.EMAILJS_USER_ID
//     );
//     console.log("Password reset email sent successfully:", response.status);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };
