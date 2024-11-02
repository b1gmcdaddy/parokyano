const jwt = require("jsonwebtoken");
const db = require("../controllers/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();
const emailjs = require("emailjs-com");

const secretKey = "please-Lord-graduate-mi";
const refreshTokenSecret = "one-God-one-church";
let refreshTokens = [];

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM user WHERE email = ?`;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    console.log(user);
    const isMatch = bcrypt.compare(password, user.password);

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

// exports.requestPasswordReset = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);

//   try {
//     const [user] = await db
//       .promise()
//       .query("SELECT * FROM user WHERE email = ?", [email]);

//     if (user.length === 0) {
//       return res.status(404).json({ message: "Email not found" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

//     await db
//       .promise()
//       .query(
//         "UPDATE user SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
//         [resetToken, tokenExpiry, email]
//       );

//     await sendResetEmail(email, resetToken);

//     res.status(200).json({ message: "Password reset email sent!" });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
