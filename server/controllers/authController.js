const jwt = require("jsonwebtoken");
const db = require("../controllers/db");
const secretKey = "your-secret-key";
const refreshTokenSecret = "your-refresh-token-secret";
let refreshTokens = [];

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT userID, first_name, last_name, email, user_type FROM user WHERE status = "active" AND email = ? AND password = ?`;

  db.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("SQL error:", error);
      return res.status(500).json({ error: "Server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    console.log("user", user);
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

    res.json({
      role: user.user_type,
      id: user.userID,
      accessToken,
      refreshToken,
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
