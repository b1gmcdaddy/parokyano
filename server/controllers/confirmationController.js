require("dotenv").config();
const express = require("express");
const db = require("./db");

const retrieveByParams = (req, res) => {
  const {confirmationID} = req.query;
  db.query(
    `SELECT * FROM confirmation WHERE confirmation_id = ?`,
    [confirmationID],
    (err, result) => {
      if (err) {
        console.error("Error retriving confirmation from database", err);
        return res.status(500).json({
          message: "Failed to retrieve confirmation record",
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
