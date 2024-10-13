require("dotenv").config();
const express = require("express");
const db = require("./db");

const retrieveByParams = (req, res) => {
  const {reqID} = req.query;

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

const updateRequirements = (req, res) => {
  const {id} = req.params;
  const {
    groom_baptismCert,
    groom_confirmationCert,
    groom_birthCert,
    spouse_baptismCert,
    spouse_confirmationCert,
    spouse_birthCert,
    isParishPermit,
    isPrenuptial,
    isPreCana,
    isMarriageLicense,
  } = req.body;

  const isComplete =
    groom_baptismCert === 1 &&
    groom_confirmationCert === 1 &&
    groom_birthCert === 1 &&
    spouse_baptismCert === 1 &&
    spouse_confirmationCert === 1 &&
    spouse_birthCert === 1 &&
    isParishPermit === 1 &&
    isPrenuptial === 1 &&
    isPreCana === 1 &&
    isMarriageLicense === 1
      ? 1
      : 0;

  try {
    const [result] = db.query(
      `UPDATE wedding SET 
        groom_baptismCert = ?, 
        groom_confirmationCert = ?, 
        groom_birthCert = ?, 
        spouse_baptismCert = ?, 
        spouse_confirmationCert = ?, 
        spouse_birthCert = ?, 
        isParishPermit = ?, 
        isPrenuptial = ?, 
        isPreCana = ?, 
        isMarriageLicense = ?, 
        isComplete = ?
      WHERE wedding_id = ?`,
      [
        groom_baptismCert,
        groom_confirmationCert,
        groom_birthCert,
        spouse_baptismCert,
        spouse_confirmationCert,
        spouse_birthCert,
        isParishPermit,
        isPrenuptial,
        isPreCana,
        isMarriageLicense,
        isComplete,
        id,
      ]
    );

    return res
      .status(200)
      .json({message: "Wedding requirements updated successfully."});
  } catch (error) {
    // console.error("Error updating wedding requirements:", error);
    // return res.status(500).json({error: "Internal server error."});
  }
};

module.exports = {
  retrieveByParams,
  updateRequirements,
};
