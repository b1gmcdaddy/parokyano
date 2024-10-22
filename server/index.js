//this file is mostly for server and db connectivity

const mysql = require("mysql2");
const bp = require("body-parser");
const app = require("./routes");
const cors = require("cors");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  connectTimeout: 30000,
  timezone: "+08:00",
  port: process.env.PORT,
});
const PORT = process.env.PORT;

pool.getConnection((err, connection) => {
  // connection.release();
  if (err) {
    console.log("error connecting to db", err.stack);
    return;
  }
  console.log("connected to db as " + connection.threadId);
  connection.release();
});

// app.use(bp.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
//   })
// );

app.get("/", (req, res) => {
  res.json({
    status: 200,
    connection: "successful",
  });
  // connection.release();
});

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});
