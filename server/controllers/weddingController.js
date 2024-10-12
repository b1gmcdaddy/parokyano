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

const updateRequirements = async (req, res) => {
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

  try {
    const result = db.query(
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
        isMarriageLicense = ? 
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
        id,
      ]
    );

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({message: "Wedding requirements updated successfully."});
    } else {
      return res.status(404).json({error: "Wedding request not found."});
    }
  } catch (error) {
    console.error("Error updating wedding requirements:", error);
    return res.status(500).json({error: "Internal server error."});
  }
};

module.exports = {
  retrieveByParams,
  updateRequirements,
};
