require("dotenv").config();
const express = require("express");
const axios = require("axios");
const db = require("./db");

const API_KEY = process.env.SEMAPHORE_API_KEY;

const sendSMS = (req, res) => {
  const {message, recipient} = req.body;

  if (!message || !recipient) {
    return res.status(400).json({
      error: "Message and recipient are required",
      status: "400",
    });
  }

  db.query(
    "SELECT SMS FROM configuration WHERE configurationID = 1",
    (err, rows) => {
      if (err) {
        console.error("Error fetching SMS configuration", err);
        return res.status(500).json({error: "Database error", status: "500"});
      }

      if (!rows || rows.length === 0 || rows[0].SMS !== 1) {
        return res.status(200).json({
          message: "SMS is disabled in configuration.",
        });
      }

      axios
        .post("https://api.semaphore.co/api/v4/messages", {
          apikey: API_KEY,
          number: recipient,
          message: message,
          sendername: "Gethsemane",
        })
        .then((response) => {
          return res.status(200).json({
            message: "SMS sent successfully",
            data: response.data,
          });
        })
        .catch((error) => {
          console.error("Error sending SMS", error);
          return res
            .status(500)
            .json({error: "Error sending SMS", status: "500"});
        });
    }
  );
};

module.exports = {
  sendSMS,
};
