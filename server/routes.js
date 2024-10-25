require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//CORS policies
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Use the environment variable or allow all origins by default
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());

// define routes here
const requestRoute = require("./routes/requestRoute");
const serviceRoute = require("./routes/serviceRoute");
const announcementRoute = require("./routes/announcementRoute");
const priestRoute = require("./routes/priestRoute");
const userRoute = require("./routes/userRoute");
const sponsorRoute = require("./routes/sponsorRoute");
const weddingRoute = require("./routes/weddingRoute");
const baptismRoute = require("./routes/baptismRoute");
const confirmationRoute = require("./routes/confirmationRoute");
const logsRoute = require("./routes/logsRoutes");
const authRoute = require("./routes/authRoute");
const smsRoute = require("./routes/smsRoute");

app.use("/auth", authRoute);
app.use("/request", requestRoute);
app.use("/service", serviceRoute);
app.use("/announcement", announcementRoute);
app.use("/priest", priestRoute);
app.use("/user", userRoute);
app.use("/sponsor", sponsorRoute);
app.use("/wedding", weddingRoute);
app.use("/baptism", baptismRoute);
app.use("/confirmation", confirmationRoute);
app.use("/logs", logsRoute);
app.use("/sms", smsRoute);

//debugging purposes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
