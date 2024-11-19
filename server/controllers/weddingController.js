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

// for th ACTUAL WEDDING MODAl
const updateWeddingDetails = (req, res) => {
  const requestID = req.params.requestID;
  const {
    first_name,
    middle_name,
    last_name,
    relationship,
    spouse_firstName,
    spouse_middleName,
    spouse_lastName,
    contact_no,
    interview_date,
    interview_time,
    priest_id,
    preferred_date,
    preferred_time,
    transaction_no,
    payment_status,
    service_id,
  } = req.body;

  try {
    const updateRequest = `
      UPDATE request 
      SET first_name = ?, middle_name = ?, last_name = ?, relationship = ?, 
          contact_no = ?, interview_date = ?, interview_time = ?, 
          priest_id = ?, preferred_date = ?, preferred_time = ?, 
          transaction_no = ?, payment_status = ?, service_id = ?
      WHERE requestID = ?
    `;

    db.query(updateRequest, [
      first_name,
      middle_name,
      last_name,
      relationship,
      contact_no,
      interview_date,
      interview_time,
      priest_id,
      preferred_date,
      preferred_time,
      transaction_no,
      payment_status,
      service_id,
      requestID,
    ]);

    const updateWedding = `
      UPDATE wedding 
      SET spouse_firstName = ?, spouse_middleName = ?, spouse_lastName = ?
      WHERE requestID = ?
    `;

    db.query(updateWedding, [
      spouse_firstName,
      spouse_middleName,
      spouse_lastName,
      requestID,
    ]);

    res.json({message: "Request and wedding details updated successfully."});
  } catch (error) {
    console.error("Error updating request and wedding:", error);
    res.status(500).json({message: "Internal server error."});
  }
};

// for wedding requirments modal..
const updateRequirements = (req, res) => {
  const {id} = req.params;
  const {
    type,
    groom_baptismCert,
    groom_confirmationCert,
    groom_birthCert,
    spouse_baptismCert,
    spouse_confirmationCert,
    spouse_birthCert,
    groomMarriageLicense,
    brideMarriageLicense,
    groomCENOMAR,
    brideCENOMAR,
    groomCEDULA,
    brideCEDULA,
    isParishPermit,
    isPrenuptial,
    isPreCana,
    isMarriageBann,
    isJointAffidavit,
    isCivilContract,
    isDeathCert,
  } = req.body;

  let isComplete = 0;

  if (type == "Civilly Married") {
    isComplete =
      groom_baptismCert === 1 &&
      groom_confirmationCert === 1 &&
      groom_birthCert === 1 &&
      spouse_baptismCert === 1 &&
      spouse_confirmationCert === 1 &&
      spouse_birthCert === 1 &&
      isParishPermit === 1 &&
      isPrenuptial === 1 &&
      isPreCana === 1 &&
      isMarriageBann === 1 &&
      isCivilContract === 1
        ? 1
        : 0;
  } else if (type == "Live-in for under 4 years") {
    isComplete =
      groom_baptismCert === 1 &&
      groom_confirmationCert === 1 &&
      groom_birthCert === 1 &&
      spouse_baptismCert === 1 &&
      spouse_confirmationCert === 1 &&
      spouse_birthCert === 1 &&
      isParishPermit === 1 &&
      isPrenuptial === 1 &&
      isPreCana === 1 &&
      groomMarriageLicense === 1 &&
      brideMarriageLicense === 1 &&
      isMarriageBann === 1 &&
      groomCEDULA === 1 &&
      brideCEDULA === 1 &&
      groomCENOMAR === 1 &&
      brideCENOMAR === 1
        ? 1
        : 0;
  } else if (type == "Live-in for more than 4 years") {
    isComplete =
      groom_baptismCert === 1 &&
      groom_confirmationCert === 1 &&
      groom_birthCert === 1 &&
      spouse_baptismCert === 1 &&
      spouse_confirmationCert === 1 &&
      spouse_birthCert === 1 &&
      isParishPermit === 1 &&
      isPrenuptial === 1 &&
      isPreCana === 1 &&
      isJointAffidavit === 1 &&
      isMarriageBann === 1 &&
      groomMarriageLicense === 1 &&
      brideMarriageLicense === 1 &&
      groomCEDULA === 1 &&
      brideCEDULA === 1 &&
      groomCENOMAR === 1 &&
      brideCENOMAR === 1
        ? 1
        : 0;
  } else {
    isComplete =
      groom_baptismCert === 1 &&
      groom_confirmationCert === 1 &&
      groom_birthCert === 1 &&
      spouse_baptismCert === 1 &&
      spouse_confirmationCert === 1 &&
      spouse_birthCert === 1 &&
      isParishPermit === 1 &&
      isPrenuptial === 1 &&
      isPreCana === 1 &&
      groomMarriageLicense === 1 &&
      brideMarriageLicense === 1 &&
      isMarriageBann === 1 &&
      isDeathCert === 1 &&
      groomCEDULA === 1 &&
      brideCEDULA === 1 &&
      groomCENOMAR === 1 &&
      brideCENOMAR === 1
        ? 1
        : 0;
  }
  try {
    const [result] = db.query(
      `UPDATE wedding SET 
        groom_baptismCert = ?, 
        groom_confirmationCert = ?, 
        groom_birthCert = ?, 
        spouse_baptismCert = ?, 
        spouse_confirmationCert = ?, 
        spouse_birthCert = ?, 
        groomMarriageLicense = ?,
        brideMarriageLicense = ?,
        groomCENOMAR = ?,
        brideCENOMAR = ?,
        groomCEDULA = ?,
        brideCEDULA = ?,
        isParishPermit = ?, 
        isPrenuptial = ?, 
        isPreCana = ?, 
        isMarriageBann = ?,
        isJointAffidavit = ?,
        isCivilContract = ?,
        isDeathCert = ?,
        isComplete = ?
      WHERE wedding_id = ?`,
      [
        groom_baptismCert,
        groom_confirmationCert,
        groom_birthCert,
        spouse_baptismCert,
        spouse_confirmationCert,
        spouse_birthCert,
        groomMarriageLicense,
        brideMarriageLicense,
        groomCENOMAR,
        brideCENOMAR,
        groomCEDULA,
        brideCEDULA,
        isParishPermit,
        isPrenuptial,
        isPreCana,
        isMarriageBann,
        isJointAffidavit,
        isCivilContract,
        isDeathCert,
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

const updateBulk = (req, res) => {
  const {weddingInfo, id} = req.body;
  const Columns = Object.keys(weddingInfo)
    .map((key) => `${key} = ?`)
    .join(", ");
  const Values = [...Object.values(weddingInfo), id];

  db.query(
    `UPDATE wedding SET ${Columns} WHERE request_id = ?`,
    Values,
    (err, result) => {
      if (err) {
        console.error("Error updating wedding", err);
        return res.status(500).json({message: "Error updating wedding"});
      }
      res.status(200).json({message: "Update successful"});
    }
  );
};

module.exports = {
  retrieveByParams,
  updateRequirements,
  updateWeddingDetails,
  updateBulk,
};
