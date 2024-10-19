const jwt = require("jsonwebtoken");
const db = require("../controllers/db");
const bcrypt = require("bcrypt");
const secretKey = "please-Lord-graduate-mi";
const refreshTokenSecret = "one-God-one-church";
let refreshTokens = [];

exports.login = (req, res) => {
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
