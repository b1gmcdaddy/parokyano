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

const addConfirmationRecord = (req, res) => {
  const request = req.body;
  const archive = JSON.stringify(request.archive_info);

  const child_name = `${request.first_name} ${request.middle_name} ${request.last_name}`;
  db.query(
    "INSERT INTO confirmation (child_name, father_name, mother_name, officiating_priest, confirmation_date, details) VALUES (?, ?, ?, ?, ?, ?)",
    [
      child_name,
      request.father_name,
      request.mother_name,
      request.officiating_priest,
      request.confirmation_date,
      archive,
    ],
    (err, result) => {
      if (err) {
        console.error("error submitting to db", err);
        return res.status(500);
      }
      return res.status(200);
    }
  );
};

module.exports = {
  retrieveByParams,
  addConfirmationRecord
};
