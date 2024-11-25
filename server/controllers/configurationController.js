require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");
const {parse} = require("dotenv");
const dayjs = require("dayjs");

const getIntentionCount = (req, res) => {
  console.log("api1");
  db.query(
    `SELECT intentionCount FROM configuration WHERE configurationID = 1`,

    (err, result) => {
      const count = result[0]?.intentionCount;
      console.log(count);
      if (err) {
        return res.status(500).json({message: "Internal server error"});
      }
      db.query(
        `UPDATE configuration SET intentionCount = intentionCount + 1 WHERE configurationID = 1`,
        (err, updateResult) => {
          if (err) {
            return res.status(500).json({message: "Internal server error"});
          }
          return res.status(200).json({intentionCount: count});
        }
      );
    }
  );
};

const getCurrentSMS = (req, res) => {
  db.query(
    "SELECT SMS FROM configuration WHERE configurationID = 1",
    (err, result) => {
      if (err) {
        console.error("error retrieving sms state from db", err);
        return res.status(500).json({
          error: "server error",
          status: "500",
        });
      }
      return res.status(200).send(result);
    }
  );
};

const toggleSMS = (req, res) => {
  const smsEnabled = req.body.smsEnabled;

  db.query(
    "UPDATE configuration SET SMS = ? WHERE configurationID = 1",
    [smsEnabled],
    (err, result) => {
      if (err) {
        console.error("err updating database:", err);
        return res.status(500).send("err updating database");
      }

      if (result.affectedRows > 0) {
        return res.status(200).send("sms toggle updatde");
      } else {
        console.log("error update sms field");
        return res.status(400).send("sms field was nott updatded");
      }
    }
  );
};

module.exports = {
  getIntentionCount,
  getCurrentSMS,
  toggleSMS,
};
