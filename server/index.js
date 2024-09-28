//this file is mostly for server and db connectivity

const mysql = require("mysql");
const bp = require("body-parser");
const app = require("./routes");

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  connectionLimit: 5,
  connectTimeout: 30000,
  acquireTimeout: 30000,
  ssl: {
    rejectUnauthorized: false, // Adjust based on your SSL cert requirements
  },
});
const PORT = process.env.PORT;

pool.getConnection((err, connection) => {
  if (err) {
    console.log("error connecting to db", err.stack);
    return;
  }
  console.log("connected to db as " + connection.threadId);
});

app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: 200,
    connection: "successful",
  });
});

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});
