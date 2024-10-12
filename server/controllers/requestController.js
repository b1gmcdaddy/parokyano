//api here when frontend is done
require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");
const {parse} = require("dotenv");
const dayjs = require("dayjs");

const dateToday = new Date().toJSON().slice(0, 10);

const createRequestIntention = (req, res) => {
  const data = req.body;
  const intention = JSON.stringify(data.intention_details);

  // CORRESPONDING FIELDS IN DB
  // requested_by = offered_by
  // preferred_date = mass_date
  // preferred_time = mass_time
  db.query(
    "INSERT INTO request (details, type, requested_by, contact_no, preferred_date, preferred_time, payment_method, donation, service_id, date_requested, transaction_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      intention,
      data.type,
      data.offered_by,
      data.contact_no,
      data.mass_date,
      data.mass_time,
      data.payment_method,
      data.donation_amount,
      data.service_id,
      dateToday,
      data.transaction_no,
    ],
    (err, result) => {
      if (err) {
        console.error("error submitting to db", err);
        return res.status(500).json({status: 500, success: false});
      }
      return res.status(200).json({success: true});
    }
  );
};

const createRequestCertificate = (req, res) => {
  const request = req.body;
  const archive = JSON.stringify(request.archive_info);
  const spouse = JSON.stringify(request.spouse_name);

  if (request.baptism_date != null && request.preferred_date == null) {
    request.preferred_date = request.baptism_date;
  }

  // did not include payment method in query since it is cash by default && all certificates are to be paid in cash
  // baptism, confirmation, and wedding dates are stored in PREFERRED DATE to save some space and lessen query length:>
  db.query(
    "INSERT INTO request (first_name, middle_name, last_name, birth_date, birth_place, contact_no, father_name, mother_name, preferred_date, details, service_id, transaction_no, date_requested, purpose, spouse_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      request.first_name,
      request.middle_name,
      request.last_name,
      request.birth_date,
      request.birth_place,
      request.contact_no,
      request.father_name,
      request.mother_name,
      request.preferred_date,
      archive,
      request.service_id,
      request.transaction_no,
      dateToday,
      request.purpose,
      spouse,
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

const createRequestBaptism = (req, res) => {
  const request = req.body;
  const dateToday = new Date();

  // Insert the main request
  db.query(
    "INSERT INTO request (first_name, middle_name, last_name, birth_date, birth_place, father_name, mother_name, address, contact_no, preferred_date, preferred_time, priest_id, payment_method, transaction_no, date_requested, service_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      request.first_name,
      request.middle_name,
      request.last_name,
      request.birth_date,
      request.birth_place,
      request.father_name,
      request.mother_name,
      request.address,
      request.contact_no,
      request.preferred_date,
      request.preferred_time,
      request.priest_id,
      request.payment_method,
      request.transaction_no,
      dateToday,
      request.service_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error submitting to database", err);
        return res.status(500).json({
          message: "Failed to create baptism request",
          error: err.message,
        });
      }

      // Get the newly inserted request's ID
      const requestID = result.insertId;

      // Insert sponsors
      const sponsorQueries = request.sponsors.map(
        (sponsor) =>
          new Promise((resolve, reject) => {
            db.query(
              "INSERT INTO sponsor (name, isCatholic, request_id) VALUES (?, ?, ?)",
              [sponsor.name, sponsor.isCatholic, requestID],
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            );
          })
      );

      // After all sponsor insertions complete, insert the baptism details
      Promise.all(sponsorQueries)
        .then(() => {
          db.query(
            "INSERT INTO baptism (gender, father_age, mother_age, isChurchMarried, isCivilMarried, isLiveIn, marriage_date, marriage_place, liveIn_years, request_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [
              request.details.gender,
              request.details.father_age,
              request.details.mother_age,
              request.details.isChurchMarried,
              request.details.isCivilMarried,
              request.details.isLiveIn,
              request.details.marriage_date,
              request.details.marriage_place,
              request.details.liveIn_years,
              requestID,
            ],
            (err, result) => {
              if (err) {
                console.error(
                  "Error submitting baptism details to database",
                  err
                );
                return res.status(500).json({
                  message: "Failed to create baptism request",
                  error: err.message,
                });
              }
              return res.status(200).json({
                message: "Baptism request submitted successfully",
              });
            }
          );
        })
        .catch((err) => {
          console.error("Error inserting sponsors", err);
          res.status(500).json({
            message:
              "Failed to create baptism request due to sponsor insertion",
            error: err.message,
          });
        });
    }
  );
};

const createRequestWedding = async (req, res) => {
  const request = req.body;

  try {
    const insertRequestQuery = `INSERT INTO request 
      (first_name, middle_name, last_name, contact_no, relationship, transaction_no, service_id, date_requested)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const insertRequestValues = [
      request.first_name,
      request.middle_name,
      request.last_name,
      request.contact_no,
      request.relationship,
      request.transaction_no,
      request.service_id,
      dateToday,
    ];

    const [insertResult] = await db
      .promise()
      .query(insertRequestQuery, insertRequestValues);
    const requestID = insertResult.insertId;

    const insertSponsorQuery = `INSERT INTO sponsor (name, age, isMarried, isCatholic, request_id) VALUES (?, ?, ?, ?, ?)`;

    for (let sponsor of request.sponsors) {
      const sponsorValues = [
        sponsor.name,
        sponsor.age,
        sponsor.isMarried,
        sponsor.isCatholic,
        requestID,
      ];
      await db.promise().query(insertSponsorQuery, sponsorValues);
    }

    const insertWeddingQuery = `INSERT INTO wedding 
      (spouse_firstName, spouse_middleName, spouse_lastName, isCatholic, request_id)
      VALUES (?, ?, ?, ?, ?)`;

    const weddingValues = [
      request.wedding_details.firstName,
      request.wedding_details.middleName,
      request.wedding_details.lastName,
      request.wedding_details.isCatholic,
      requestID,
    ];

    await db.promise().query(insertWeddingQuery, weddingValues);

    return res.status(200).json({
      message: "Wedding request submitted successfully",
    });
  } catch (err) {
    console.error("Error submitting to the database", err);
    return res.status(500).json({
      message: "Failed to create wedding request",
      error: err.message,
    });
  }
};

const createRequestMass = (req, res) => {
  const request = req.body;

  db.query(
    "INSERT INTO request (first_name, address, contact_no, requested_by, relationship, preferred_date, preferred_time, priest_id, isParishioner, transaction_no, service_id, date_requested, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      request.first_name,
      request.address,
      request.contact_no,
      request.requested_by,
      request.relationship,
      dayjs(request.preferred_date).format("YYYY-MM-DD"),
      request.preferred_time,
      request.preferred_priest,
      request.isParishioner,
      request.transaction_no,
      request.service_id,
      dateToday,
      request.type,
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

const createRequestAnointing = (req, res) => {
  const request = req.body;

  db.query(
    "INSERT INTO request (first_name, age, contact_no, requested_by, address, relationship, patient_status, preferred_date, preferred_time, priest_id, isParishioner, transaction_no, service_id, date_requested) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      request.first_name,
      request.age,
      request.contact_no,
      request.requested_by,
      request.address,
      request.relationship,
      request.patient_status,
      dayjs(request.preferred_date).format("YYYY-MM-DD"),
      request.preferred_time,
      request.preferred_priest,
      request.isParishioner,
      request.transaction_no,
      request.service_id,
      dateToday,
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

const createRequestBlessing = (req, res) => {
  const request = req.body;

  db.query(
    "INSERT INTO request (type, first_name, address, requested_by, contact_no, preferred_date, preferred_time, priest_id, isParishioner, transaction_no, service_id, date_requested) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      request.type,
      request.first_name,
      request.address,
      request.requested_by,
      request.contact_no,
      dayjs(request.preferred_date).format("YYYY-MM-DD"),
      request.preferred_time,
      request.preferred_priest,
      request.isParishioner,
      request.transaction_no,
      request.service_id,
      dateToday,
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

const retrieveByParams = (req, res) => {
  const {col, val} = req.query;

  const query = `SELECT * FROM request WHERE ${col} = ?`;

  db.query(query, [val], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({result});
  });
};

// for all tables
const retrieveMultipleParams = (req, res) => {
  const {col1, val1, col2, val2, order, page, limit} = req.query;
  const offset = Number(page - 1) * parseInt(limit);

  const query = `SELECT * FROM request WHERE ${col1} = ? AND ${col2} = ? ORDER BY ${order} DESC LIMIT ? OFFSET ?`;

  db.query(query, [val1, val2, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({result});
  });
};

//para ni sa intentions print preview
const retrieveMultipleDateFiltered = (req, res) => {
  const {col1, val1, col2, val2, preferred_date, preferred_time} = req.query;

  const query = `SELECT * from request WHERE ${col1} =? AND ${col2} =? AND preferred_date = ? AND preferred_time = ? ORDER BY date_requested`;

  db.query(
    query,
    [val1, val2, preferred_date, preferred_time],
    (err, result) => {
      if (err) {
        console.error("error retrieving reqs", err);
        return res.status(500);
      }
      res.status(200).json({result});
    }
  );
};

// temporary for services table only
const retrieveRequests = (req, res) => {
  const {status, page, limit} = req.query;
  const offset = (Number(page) - 1) * parseInt(limit);

  const query = `SELECT r.*, s.name AS 'service_name' 
                 FROM request r, service s 
                 WHERE r.service_id != 1 AND r.service_id != 2 AND r.service_id != 3 AND r.service_id != 4 
                 AND r.service_id = s.serviceID 
                 AND r.status = ? 
                 ORDER BY date_requested DESC 
                 LIMIT ? OFFSET ?`;

  db.query(query, [status, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500).json({error: "Error retrieving requests"});
    }
    res.status(200).json({result});
  });
};

// temporary for certs table
const retrieveCerts = (req, res) => {
  const {status, page, limit} = req.query;
  console.log(page, limit);
  const offset = Number(page - 1) * parseInt(limit);
  console.log(offset);
  const query = `SELECT * FROM request WHERE (service_id=2 OR service_id=3 OR service_id=4) AND status=? ORDER BY date_requested DESC LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, [status, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({result});
  });
};

const getCountRequests = (req, res) => {
  const status = req.query.status;
  const query = `SELECT COUNT(*) as count FROM request WHERE service_id != 1 AND service_id != 2 AND service_id != 3 AND service_id != 4 AND status = ?`;
  db.query(query, [status], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    console.log(result[0].count);
    res.status(200).json({count: result[0].count});
  });
};

const getCountCerts = (req, res) => {
  const status = req.query.status;
  const query = `SELECT COUNT(*) as count FROM request WHERE service_id = 2 OR service_id = 3 OR service_id = 4 AND status = ?`;
  db.query(query, [status], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    console.log(result[0].count);
    res.status(200).json({count: result[0].count});
  });
};

const getCount = (req, res) => {
  const {col1, val1, col2, val2} = req.query;
  const query = `SELECT COUNT(*) as count FROM request WHERE ${col1} = ? AND ${col2} = ?`;
  db.query(query, [val1, val2], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    console.log(result[0].count);
    res.status(200).json({count: result[0].count});
  });
};

const getSummaryWithTypeParam = (req, res) => {
  const {requestDate, approveDate, type} = req.query;
  const reqSummary = {};

  if (!requestDate || !approveDate || !type) {
    return res.status(400).json("lacking dates or type parameter..");
  }
  const query = `SELECT status, COUNT(*) as count FROM request WHERE type = ? AND date_requested BETWEEN ? AND ? GROUP BY status`;
  db.query(query, [type, requestDate, approveDate], (err, results) => {
    if (err) {
      return res.status(500).json("error retrieving db info..");
    }
    reqSummary[type] = {pending: 0, approved: 0, cancelled: 0};
    results.forEach((row) => {
      reqSummary[type][row.status] = row.count;
    });
    res.json(reqSummary);
  });
};

//tested wid postman already..
const getRequestSummary = (req, res) => {
  const {startDate, endDate} = req.query;
  console.log(`Start Date: ${startDate}, End Date: ${endDate}`);

  if (!startDate || !endDate) {
    return res.status(400).json("lacking dates..");
  }

  const query = `
    SELECT 
      s.name, 
      COUNT(CASE WHEN r.status = 'pending' THEN 1 END) AS pending,
      COUNT(CASE WHEN r.status = 'approved' THEN 1 END) AS approved,
      COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) AS cancelled
    FROM 
      request r
    JOIN 
      service s ON r.service_id = s.serviceID
    WHERE 
      r.date_requested BETWEEN '${startDate}' AND '${endDate}'
    GROUP BY 
      s.serviceID;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json("error retriving db info..");
    }
    console.log(results);
    res.status(200).json(results);
  });
};

const searchIntentions = (req, res) => {
  const {col, val, status, page, limit} = req.query;
  const enhancedVal = val + "%";
  const offset = Number(page - 1) * parseInt(limit);
  const query = `SELECT * FROM request WHERE ${col} LIKE ? AND service_id = 1 AND status = ? ORDER BY date_requested DESC LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) as count FROM request WHERE ${col} LIKE ? AND service_id = 1 AND status = ?`;

  db.query(
    query,
    [enhancedVal, status, parseInt(limit), offset],
    (err, result) => {
      if (err) {
        console.error("error searching item", err);
        return res.status(500);
      }
      db.query(countQuery, [enhancedVal, status], (err, count) => {
        if (err) {
          console.error("error counting items", err);
          return res.status(500);
        }
        console.log(count[0].count);
        res.status(200).json({result, count});
      });
    }
  );
};

// possible to refactor these to a single query
const approveService = (req, res) => {
  const {col, val, col2, val2, col3, val3, col4, val4, col5, val5} = req.query;

  const query = `UPDATE request SET ${col} = ?, ${col2} = ?, ${col3} = ?, ${col4} = ?, transaction_date = ? WHERE ${col5} = ?`;
  db.query(
    query,
    [val, val2, val3, val4, dateToday, Number(val5)],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({message: "error!"});
      } else {
        res.status(200).json({message: "success!"});
      }
    }
  );
};
const approveIntention = (req, res) => {
  const {col, val, col2, val2, col3, val3} = req.query;
  const query = `UPDATE request SET ${col} = ?, ${col2} = ?, transaction_date = ? WHERE ${col3} = ?`;
  db.query(query, [val, val2, dateToday, val3], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({message: "success!"});
    }
  });
  console.log(query);
};

// may be used for approval/cancellation/printing??
const approveCertificate = (req, res) => {
  const {col, val, col2, val2, col3, val3} = req.query;
  const setClause = [];
  const values = [];

  if (col && val) {
    setClause.push(`${col} = ?`);
    values.push(val);
  }

  if (col2 && val2) {
    setClause.push(`${col2} = ?`);
    values.push(val2);
  }

  if (setClause.length == 0 || setClause == null) {
    return res.status(400).json({message: "no data to update"});
  }

  if (col3 && val3) {
    values.push(val3);
    const query = `UPDATE request SET ${setClause.join(", ")} WHERE ${col3}=?`;
    db.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({error: "update failed."});
      }
      res.status(200).json({message: "successful update"});
    });
    console.log(query);
  }
};

// const updateRequest = (req, res) => {
//   const { formData } = req.body;
//   let setClause = [];
//   let whereClause = [];
//   let values = [];

//   // Extract data from formData for the SET clause
//   for (const [key, value] of Object.entries(formData)) {
//     if (key === "requestID") {
//       whereClause.push(`${key} = ?`);
//       values.push(value);  // Add the condition to the values array
//     } else {
//       setClause.push(`${key} = ?`);
//       values.push(value);  // Add the update fields to the values array
//     }
//   }

//   // If no valid fields to update, return an error
//   if (setClause.length === 0 || whereClause.length === 0) {
//     return res.status(400).json({ message: "Invalid data for update" });
//   }

//   // Build the final SQL query
//   const query = `UPDATE request SET ${setClause.join(', ')} WHERE ${whereClause.join(' AND ')}`;

//   console.log("Generated Query:", query);
//   console.log("Query Values:", values);

//   // Execute the query
//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ message: "Error during update" });
//     }
//     res.status(200).json({ message: "Update successful!" });
//   });
// };

const searchCertRecords = (req, res) => {
  const {
    first_name,
    last_name,
    contact_no,
    birth_date,
    preferred_date,
    service_id,
    status,
  } = req.query;

  const query = `
    SELECT r.*
    FROM request r
    WHERE r.service_id = ? AND r.status = ?
      AND (r.first_name LIKE ? OR r.last_name LIKE ? OR r.contact_no LIKE ? OR r.birth_date LIKE ? OR r.preferred_date LIKE ?)`;

  const firstNameMatch = `%${first_name}%`;
  const lastNameMatch = `%${last_name}%`;
  const contactNoMatch = `%${contact_no}%`;
  const birthDateMatch = `%${birth_date}%`;
  const preferredDateMatch = `%${preferred_date}%`;

  db.query(
    query,
    [
      service_id,
      status,
      firstNameMatch,
      lastNameMatch,
      contactNoMatch,
      birthDateMatch,
      preferredDateMatch,
    ],
    (err, result) => {
      if (err) {
        console.error("error retrieving matching records", err);
        return res
          .status(500)
          .json({error: "error retrieving matching records"});
      }
      res.status(200).json({result});
    }
  );
};

//single column update
const updateByParams = (req, res) => {
  const {col, val, id} = req.query;
  const query = `UPDATE request SET ${col} = ? WHERE requestID = ?`;
  db.query(query, [val, id], (err, result) => {
    if (err) {
      console.error("error updating request", err);
      return res.status(500).json({message: "error"});
    }
    res.status(200).json({message: "success"});
  });
};

// experimental
const updateBulk = (req, res) => {
  const {formData, id} = req.body;
  console.log(formData);

  const columns = Object.keys(formData)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(formData), id];

  db.query(
    `UPDATE request SET ${columns} WHERE requestID = ?`,
    values,
    (err, result) => {
      if (err) {
        console.error("Error updating request", err);
        return res.status(500).json({message: "Error updating request"});
      }
      return res.status(200).json({message: "Update successful"});
    }
  );
};

module.exports = {
  createRequestIntention,
  createRequestCertificate,
  createRequestBaptism,
  createRequestWedding,
  createRequestMass,
  createRequestAnointing,
  createRequestBlessing,
  retrieveByParams,
  getRequestSummary,
  getSummaryWithTypeParam,
  retrieveMultipleParams,
  approveService,
  approveIntention,
  approveCertificate,
  retrieveMultipleDateFiltered,
  getCount,
  retrieveRequests,
  retrieveCerts,
  getCountRequests,
  getCountCerts,
  searchIntentions,
  searchCertRecords,
  updateByParams,
  updateBulk,
};
