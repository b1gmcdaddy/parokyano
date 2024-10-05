require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//CORS policies
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// define routes here
const requestRoute = require("./routes/requestRoute");
const serviceRoute = require("./routes/serviceRoute");
const announcementRoute = require("./routes/announcementRoute");
const priestRoute = require("./routes/priestRoute");
const userRoute = require("./routes/userRoute");
const sponsorRoute = require("./routes/sponsorRoute");
const weddingRoute = require("./routes/weddingRoute");

app.use("/request", requestRoute);
app.use("/service", serviceRoute);
app.use("/announcement", announcementRoute);
app.use("/priest", priestRoute);
app.use("/user", userRoute);
app.use("/sponsor", sponsorRoute);
app.use("/wedding", weddingRoute);

//debugging purposes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
