//this file is mostly for server and db connectivity

const mysql = require("mysql2");
const bp = require("body-parser");
const app = require("./routes");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parokyano",
  connectTimeout: 30000, // Increase connection timeout to 30 seconds
  // ssl: { rejectUnauthorized: false }, // Uncomment if SSL is required
});
const PORT = process.env.PORT;

connection.connect((err) => {
  // connection.release();
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
  // connection.release();
});

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});
