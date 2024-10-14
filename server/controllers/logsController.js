require("dotenv").config();
const express = require("express");
const db = require("./db");

const dateToday = new Date().toJSON().slice(0, 10);

const createLog = (req, res) => {
  const {activity, user_id, request_id} = req.body;
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

const retrieveAll = (req, res) => {
  const id = req.query.id;

  db.query(`SELECT * from logs WHERE request_id = ?`, [id], (err, result) => {
    if (err) {
      console.error("error retrieving logs", err);
      return res
        .status(500)
        .json({
          error: "error retrieving logs",
          message: "error retrieving logs",
          details: err,
        });
    }
    res.status(200).json({ result });
const retrieveAllLogs = (req, res) => {
  const {page, limit} = req.query;
  const offset = Number(page - 1) * parseInt(limit);

  const query = `SELECT logs.log_id, logs.activity, logs.date, logs.request_id, 
        user.first_name, user.last_name, user.user_type 
        FROM logs 
        JOIN user ON logs.user_id = user.userID ORDER BY logs.date DESC LIMIT ? OFFSET ?`;

  db.query(query, [parseInt(limit), offset], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500);
    } else {
      console.log(result);
      res.status(200).json({result});
    }
  });
};

module.exports = {
  createLog,
  retrieveAll,
  retrieveAllLogs,
};
