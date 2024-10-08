require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");

const retrieveByParams = (req, res) => {
  const { reqID } = req.query;

  db.query(
    `SELECT * FROM baptism WHERE request_id = ?`,
    [reqID],
    (err, result) => {
      if (err) {
        console.error("Error submitting to database", err);
        return res.status(500).json({
          message: "Failed to retrieve details",
          error: err.message,
        });
      }
      return res.status(200).json({
        result,
      });
    }
  );
};

module.exports = {
  retrieveByParams,
};
