require("dotenv").config();
const express = require("express");
const db = require("./db");

const retrieveByParams = (req, res) => {
  const { reqID } = req.query;

  db.query(
    `SELECT * FROM wedding WHERE request_id = ?`,
    [reqID],
    (err, result) => {
      if (err) {
        console.error("Error submitting to database", err);
        return res.status(500).json({
          message: "Failed to retrieve wedding",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "Retrieved wedding for request_id: " + reqID,
        result,
      });
    }
  );
};

module.exports = {
  retrieveByParams,
};
