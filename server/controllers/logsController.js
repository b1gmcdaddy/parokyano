require("dotenv").config();
const express = require("express");
const db = require("./db");

const dateToday = new Date().toJSON().slice(0, 10);

const createLog = (req, res) => {
  const { activity, user_id, request_id } = req.body;
  db.query(
    `INSERT INTO logs (date, activity,user_id, request_id) VALUES (?, ?, ?,  ?)`,
    [dateToday, activity, user_id, request_id],
    (err, result) => {
      if (err) {
        console.error("error submitting to db", err);
        return res.status(500).json({
          message: "Failed to create log",
          error: err.message,
        });
      }
      return res.status(200).json({
        message: "Log created successfully",
      });
    }
  );
};

module.exports = {
  createLog,
};
