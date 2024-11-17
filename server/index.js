//this file is mostly for server and db connectivity

const mysql = require("mysql2");
const bp = require("body-parser");
const app = require("./routes");
const cors = require("cors");
require("dotenv").config();
const { CronJob } = require("cron");

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

const cron = new CronJob(
  "0 0 * * *",
  () => {
    console.log("running cron job");
    pool.query(
      `
      UPDATE request SET status = 'finished' WHERE status = 'approved' AND preferred_date < CURDATE() AND payment_status = 'paid';
    `,
      (err, result) => {
        if (err) {
          console.error("error updating requests", err);
          return;
        }
        console.log("updated requests!");
      }
    );
  },
  null,
  true,
  "Asia/Manila"
);
cron.start();

app.get("/", (req, res) => {
  res.json({
    status: 200,
    connection: "successful",
  });
  // connection.release();
});

app.listen(process.env.PORT, () => {
  console.log(`port running on ${PORT}`);
});
