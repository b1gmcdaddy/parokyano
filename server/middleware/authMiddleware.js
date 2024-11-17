const jwt = require("jsonwebtoken");
const secretKey = "please-Lord-graduate";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token found");
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.sendStatus(403); // Forbidden
    }
    console.log("Decoded user from token:", user);
    req.user = user;
    next();
  });
};

const authenticateStaff = (req, res, next) => {
  console.log(req);
  authenticateToken(req, res, () => {
    if (req.user.role !== "staff") {
      console.log("Access denied. Role:", req.user.role);
      return res.status(403).json({error: "Access denied"});
    }
    next();
  });
};

module.exports = {authenticateToken, authenticateStaff};
