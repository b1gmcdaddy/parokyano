require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");

const retrieveByParams = (req, res) => {
  const { reqID } = req.query;
  console.log(reqID);
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

const updateBulk = (req, res) => {
  const { details, id } = req.body;
  const Columns = Object.keys(details)
    .map((key) => `${key} = ?`)
    .join(", ");
  const Values = [...Object.values(details), id];

  db.query(
    `UPDATE baptism SET ${Columns} WHERE request_id = ?`,
    Values,
    (err, result) => {
      if (err) {
        console.error("Error updating baptism", err);
        return res.status(500).json({ message: "Error updating baptism" });
      }
      res.status(200).json({ message: "Update successful" });
    }
  );
};

module.exports = {
  retrieveByParams,
  updateBulk,
};
