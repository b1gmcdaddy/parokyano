const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parokyano",
  connectTimeout: 30000, // Increase connection timeout to 30 seconds
  // ssl: { rejectUnauthorized: false }, // Uncomment if SSL is required
});

module.exports = connection;
