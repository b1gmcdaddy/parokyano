require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");
const {parse} = require("dotenv");
const dayjs = require("dayjs");

const getIntentionCount = (req, res) => {
  // const { id } = req.params;
  console.log("api1");
  db.query(
    `SELECT intentionCount FROM configuration WHERE configurationID = 1`,
    // [id],
    (err, result) => {
      const count = result[0].intentionCount;
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
          return res.status(200).send(count);
        }
      );
    }
  );
};

const getCurrentSMS = (req, res) => {
  db.query("SELECT SMS FROM configuration LIMIT 1", (err, result) => {
    if (err) {
      console.error("error retrieving sms state from db", err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    return res.status(200).send(result);
  });
};

const toggleSMS = (req, res) => {
  try {
    const [row] = db.query("SELECT SMS FROM configuration LIMIT 1");

    if (!row) {
      return res.status(404).json({
        error: "sms field not found..",
        status: "404",
      });
    }
    const newSMSValue = row.SMS === 1 ? 0 : 1;
    db.query("UPDATE configuration SET SMS = ? LIMIT 1", [newSMSValue]);

    return res.status(200).json({
      message: "SMS toggle success.",
      newSMSValue,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "failed to toggle sms",
      status: "500",
    });
  }
};

module.exports = {
  getIntentionCount,
  getCurrentSMS,
  toggleSMS,
};
