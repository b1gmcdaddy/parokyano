const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  connectTimeout: 30000, // Increase connection timeout to 30 seconds
  timezone: "Z",
  port: process.env.PORT,
});

module.exports = pool;
