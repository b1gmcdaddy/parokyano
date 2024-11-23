require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");
const { parse } = require("dotenv");
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
        return res.status(500).json({ message: "Internal server error" });
      }
      db.query(
        `UPDATE configuration SET intentionCount = intentionCount + 1 WHERE configurationID = 1`,
        (err, updateResult) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          return res.status(200).send(count);
        }
      );
    }
  );
};

module.exports = {
  getIntentionCount,
};
