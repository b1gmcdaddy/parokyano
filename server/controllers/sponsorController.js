require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");

const retrieveByParams = (req, res) => {
  const { reqID } = req.query;

  db.query(
    `SELECT * FROM sponsor WHERE request_id = ?`,
    [reqID],
    (err, result) => {
      if (err) {
        console.error("Error submitting to database", err);
        return res.status(500).json({
          message: "Failed to retrieve sponsors",
          error: err.message,
        });
      }
      return res.status(200).json({
        result,
      });
    }
  );
};

const addSponsor = async (req, res) => {
  const { name, age, isMarried, isCatholic, request_id } = req.body;

  try {
    const query = `INSERT INTO sponsor (name, age, isMarried, isCatholic, request_id) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [name, age, isMarried, isCatholic, request_id]);

    return res.status(201).json({
      message: "Sponsor added successfully",
    });
  } catch (err) {
    console.error("Error adding sponsor to the database", err);
    return res.status(500).json({
      message: "Failed to add sponsor",
    });
  }
};

const deleteSponsor = async (req, res) => {
  const { sponsorID } = req.params;

  try {
    const deleteSponsorQuery = `DELETE FROM sponsor WHERE sponsorID = ?`;
    db.query(deleteSponsorQuery, [sponsorID]);

    return res.status(200).json({
      message: "Sponsor deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting sponsor from the database", err);
    return res.status(500).json({
      message: "Failed to delete sponsor",
    });
  }
};

const retrieveCount = (req, res) => {
  const { col, val } = req.query;

  const query = `SELECT COUNT(*) as count FROM sponsor WHERE ${col} = ?`;
  db.query(query, [val], (err, result) => {
    if (err) {
      console.error("error retrieving sponsors", err);
      return res.status(500);
    }
    console.log(result[0].count);
    res.status(200).json({ count: result[0].count });
  });
};

module.exports = {
  retrieveByParams,
  addSponsor,
  deleteSponsor,
  retrieveCount,
};
