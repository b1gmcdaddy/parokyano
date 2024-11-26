//api here when frontend is done
require("dotenv").config();
const express = require("express");
const db = require("./db");
const _ = require("lodash");
const { parse } = require("dotenv");
const dayjs = require("dayjs");

const createRequestIntention = (req, res) => {
  const data = req.body;
  const intention = JSON.stringify(data.intention_details);

  // CORRESPONDING FIELDS IN DB
  // requested_by = offered_by
  // preferred_date = mass_date
  // preferred_time = mass_time
  db.query(
    "INSERT INTO request (details, type, requested_by, contact_no, preferred_date, preferred_time, payment_method, donation, gcashRefNo, service_id, date_requested, transaction_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      intention,
      data.type,
      data.offered_by,
      data.contact_no,
      data.mass_date,
      data.mass_time,
      data.payment_method,
      data.donation_amount,
      data.gcashRefNo || null,
      data.service_id,
      new Date(),
      data.transaction_no,
    ],
    (err, result) => {
      if (err) {
        console.error("error submitting to db", err);
        return res.status(500).json({ status: 500, success: false });
      }
      return res.status(200).json({ success: true });
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
      new Date(),
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
  // const new Date() = new Date();

  // Insert the main request
  db.query(
    "INSERT INTO request (donation, first_name, middle_name, last_name, birth_date, birth_place, father_name, mother_name, address, contact_no, preferred_date, preferred_time, priest_id, payment_method, gcashRefNo, transaction_no, date_requested, service_id) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      request.donation,
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
      request.gcashRefNo || null,
      request.transaction_no,
      new Date(),
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
              request.details.isChurchMarried != ""
                ? request.details.isChurchMarried
                : 0,
              request.details.isCivilMarried != ""
                ? request.details.isCivilMarried
                : 0,
              request.details.isLiveIn != "" ? request.details.liveIn_years : 0,
              request.details.marriage_date || null,
              request.details.marriage_place || null,
              request.details.liveIn_years || null,
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
      (first_name, middle_name, last_name, contact_no, relationship, transaction_no, service_id, date_requested, isParishioner)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const insertRequestValues = [
      request.first_name,
      request.middle_name,
      request.last_name,
      request.contact_no,
      request.relationship,
      request.transaction_no,
      request.service_id,
      new Date(),
      request.isParishioner,
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
      (spouse_firstName, spouse_middleName, spouse_lastName, isCatholic, request_id, groomDetails, brideDetails)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const weddingValues = [
      request.wedding_details.firstName,
      request.wedding_details.middleName,
      request.wedding_details.lastName,
      request.wedding_details.isCatholic,
      requestID,
      JSON.stringify(request.groomDetails),
      JSON.stringify(request.brideDetails),
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
      new Date(),
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
      new Date(),
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
      new Date(),
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
  const { col, val } = req.query;

  const query = `SELECT * FROM request WHERE ${col} = ?`;

  db.query(query, [val], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({ result });
  });
};

// for all tables
const retrieveMultipleParams = (req, res) => {
  const { col1, val1, col2, val2, order, page, limit } = req.query;
  const offset = Number(page - 1) * parseInt(limit);

  const query = `SELECT r.*, s.name AS 'service_name' FROM request r, service s WHERE r.${col1} = ? AND r.${col2} = ? AND r.service_id = s.serviceID ORDER BY ${order} DESC LIMIT ? OFFSET ?`;

  db.query(query, [val1, val2, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({ result });
  });
};

//only transactions
const retrieveTransactions = (req, res) => {
  const { col1, val1, col2, val2, order, page, limit } = req.query;
  const offset = Number(page - 1) * parseInt(limit);

  const query = `SELECT r.*, s.name AS 'service_name' FROM request r, service s WHERE (r.${col1} = ? OR r.status = 'finished') AND r.${col2} = ? AND r.service_id = s.serviceID ORDER BY ${order} DESC LIMIT ? OFFSET ?`;

  db.query(query, [val1, val2, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({ result });
  });
};

//para ni sa intentions print preview
const retrieveMultipleDateFiltered = (req, res) => {
  const { col1, val1, col2, val2, preferred_date, preferred_time } = req.query;

  const query = `SELECT * from request WHERE ${col1} =? AND ${col2} =? AND preferred_date = ? AND preferred_time = ? ORDER BY date_requested`;

  db.query(
    query,
    [val1, val2, preferred_date, preferred_time],
    (err, result) => {
      if (err) {
        console.error("error retrieving reqs", err);
        return res.status(500);
      }
      res.status(200).json({ result });
    }
  );
};

// temporary for services table only
const retrieveRequests = (req, res) => {
  const { status, page, limit } = req.query;
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
      return res.status(500).json({ error: "Error retrieving requests" });
    }
    res.status(200).json({ result });
  });
};

// temporary for certs table
const retrieveCerts = (req, res) => {
  const { status, page, limit } = req.query;
  console.log(page, limit);
  const offset = Number(page - 1) * parseInt(limit);
  console.log(offset);
  const query = `SELECT * FROM request WHERE service_id IN (2, 3, 4) AND status=? ORDER BY date_requested DESC LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, [status, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    res.status(200).json({ result });
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
    res.status(200).json({ count: result[0].count });
  });
};

// For Dashboard and possibly for generate report?
const getCountRequestsDateFiltered = (req, res) => {
  const { dateFilter } = req.query;

  const currentDate = new Date();

  let dateCondition = "";
  switch (dateFilter) {
    case "Today":
      dateCondition = `DATE(date_requested) = CURDATE()`;
      break;
    case "This Week":
      dateCondition = `YEARWEEK(date_requested, 1) = YEARWEEK(CURDATE(), 1)`; // ISO Week
      break;
    case "This Month":
      dateCondition = `YEAR(date_requested) = YEAR(CURDATE()) AND MONTH(date_requested) = MONTH(CURDATE())`;
      break;
    default:
      return res.status(400).json({ error: "Invalid date filter" });
  }
  const queryA = `SELECT COUNT(*) as countA FROM request WHERE service_id = 1 AND status IN ('approved', 'pending') AND ${dateCondition}`;
  const queryB = `SELECT COUNT(*) as countB FROM request WHERE service_id IN (2, 3, 4) AND status IN ('approved', 'pending') AND ${dateCondition}`;
  const queryC = `SELECT COUNT(*) as countC FROM request WHERE service_id BETWEEN 5 AND 13 AND status IN ('approved', 'pending') AND ${dateCondition}`;

  db.query(queryA, (errA, resultA) => {
    if (errA) {
      console.error("Error retrieving mass intentions count", errA);
      return res.status(500).json({ error: "Database error" });
    }

    db.query(queryB, (errB, resultB) => {
      if (errB) {
        console.error("Error retrieving cert requests count", errB);
        return res.status(500).json({ error: "Database error" });
      }

      db.query(queryC, (errC, resultC) => {
        if (errC) {
          console.error("Error retrieving service requests counts", errC);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({
          countA: resultA[0].countA,
          countB: resultB[0].countB,
          countC: resultC[0].countC,
        });
      });
    });
  });
};

///////// For Dashboard 'Upcoming Events'/////////////
const getUpcomingEvents = (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const query = `
    SELECT * 
    FROM request 
    WHERE status = 'approved' 
    AND preferred_date >= ? 
    AND service_id NOT IN (1, 2, 3, 4)
    ORDER BY preferred_date ASC
    LIMIT 5
  `;

  db.query(query, [currentDate], (err, result) => {
    if (err) {
      console.error("Error retrieving approved requests:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while retrieving requests." });
    }

    res.status(200).json({ success: true, data: result });
  });
};

const getCountCerts = (req, res) => {
  const status = req.query.status;
  const query = `SELECT COUNT(*) as count FROM request WHERE (service_id = 2 OR service_id = 3 OR service_id = 4) AND status = ?`;
  db.query(query, [status], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    console.log(result[0].count);
    res.status(200).json({ count: result[0].count });
  });
};

const getCount = (req, res) => {
  const { col1, val1, col2, val2 } = req.query;
  const query = `SELECT COUNT(*) as count FROM request WHERE ${col1} = ? AND ${col2} = ?`;
  db.query(query, [val1, val2], (err, result) => {
    if (err) {
      console.error("error retrieving requests", err);
      return res.status(500);
    }
    console.log(result[0].count);
    res.status(200).json({ count: result[0].count });
  });
};

const getSpecificSummary = (req, res) => {
  const { startDate, endDate, category } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json("lacking dates..");
  }

  // const categoryQuery = category !== "" ? `AND r.service_id = ${category}` : "";

  const queryApproved = `
    SELECT r.* FROM request r 
    WHERE (r.status = 'approved' OR r.status = 'finished') AND r.payment_status = 'paid'
      AND r.date_requested BETWEEN '${startDate}' AND '${endDate}' 
      ${category};
  `;

  const queryCancelled = `
    SELECT r.* FROM request r 
    WHERE r.status = 'cancelled' 
      AND r.date_requested BETWEEN '${startDate}' AND '${endDate}' 
      ${category};
  `;

  const queryPending = `
    SELECT r.* FROM request r 
    WHERE r.status = 'pending' 
      AND r.date_requested BETWEEN '${startDate}' AND '${endDate}' 
      ${category};
  `;

  db.query(queryApproved, (err, approved) => {
    if (err) {
      console.error("Error retrieving approved requests", err);
      return res
        .status(500)
        .json({ error: "Error retrieving approved requests" });
    }

    db.query(queryCancelled, (err, cancelled) => {
      if (err) {
        console.error("Error retrieving cancelled requests", err);
        return res
          .status(500)
          .json({ error: "Error retrieving cancelled requests" });
      }

      db.query(queryPending, (err, pending) => {
        if (err) {
          console.error("Error retrieving pending requests", err);
          return res
            .status(500)
            .json({ error: "Error retrieving pending requests" });
        }

        res.status(200).json({ approved, cancelled, pending });
      });
    });
  });
};

//tested wid postman already..
const getRequestSummary = (req, res) => {
  const { startDate, endDate, category } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json("lacking dates..");
  }

  // const categoryQuery = category != "" ? `AND r.service_id = ${category}` : "";

  const query = `
    SELECT 
      s.name, 
      SUM(CASE WHEN (r.status = 'approved' OR r.status = 'finished') AND r.payment_status = 'paid' THEN r.donation ELSE 0 END) AS totalFee, 
      COUNT(CASE WHEN r.status = 'pending' THEN 1 END) AS pending, 
      COUNT(CASE WHEN (r.status = 'approved' OR r.status = 'finished') THEN 1 END) AS approved, 
      COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) AS cancelled
    FROM 
      request r
    JOIN 
      service s ON r.service_id = s.serviceID
    WHERE 
      r.date_requested BETWEEN '${startDate}' AND '${endDate}' ${category}
    GROUP BY 
      s.serviceID, s.name;`;
  console.log(query);

  db.query(query, (err, summary) => {
    if (err) {
      console.error(err);
      return res.status(500).json("error retriving db info..");
    }
    // console.log(summary);
    const results = summary;

    db.query(
      `SELECT * FROM request r WHERE  r.date_requested BETWEEN '${startDate}' AND '${endDate}' AND (r.service_id = 5 OR r.service_id = 6) AND (r.status = 'approved' OR r.status = 'finished') ${category}`,
      (err, baptisms) => {
        if (err) {
          console.error("error retrieving requests", err);
          return res.status(500).json({ error: "Error retrieving requests" });
        }
        db.query(
          `SELECT r.*, w.* FROM request r, wedding w WHERE (r.service_id = 7) AND r.requestID = w.request_id AND (r.status = 'approved' OR r.status = 'finished') AND r.date_requested BETWEEN '${startDate}' AND '${endDate}' ${category}`,
          (err, weddings) => {
            if (err) {
              console.error("error retrieving requests", err);
              return res
                .status(500)
                .json({ error: "Error retrieving requests" });
            }
            db.query(
              `SELECT r.*, b.* FROM request r, baptism b WHERE (r.service_id = 6) AND r.requestID = b.request_id AND (r.status = 'approved' OR r.status = 'finished') AND r.date_requested BETWEEN '${startDate}' AND '${endDate}' ${category}`,
              (err, baptismsGeneral) => {
                if (err) {
                  console.error("error retrieving requests", err);
                  return res
                    .status(500)
                    .json({ error: "Error retrieving requests" });
                }
                res
                  .status(200)
                  .json({ results, baptisms, weddings, baptismsGeneral });
              }
            );
          }
        );
      }
    );
  });
};

const searchIntentions = (req, res) => {
  const { col, val, status, page, limit } = req.query;
  const enhancedVal = "%" + val + "%";
  const offset = Number(page - 1) * parseInt(limit);
  const query = `SELECT * FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}') AND service_id = 1 AND status = ? ORDER BY date_requested DESC LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) as count FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}') AND service_id = 1 AND status = ?`;

  db.query(query, [status, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error searching item", err);
      return res.status(500);
    }
    db.query(countQuery, [status], (err, count) => {
      if (err) {
        console.error("error counting items", err);
        return res.status(500);
      }
      console.log(count[0].count);
      console.log(result);
      res.status(200).json({ result, count });
    });
  });
};

const searchRequests = (req, res) => {
  const { col, val, status, page, limit } = req.query;
  const enhancedVal = "%" + val + "%";
  const offset = Number(page - 1) * parseInt(limit);
  const query = `SELECT r.*, s.name AS 'service_name' FROM request r INNER JOIN service s ON r.service_id = s.serviceID WHERE (r.requested_by LIKE '${enhancedVal}' OR r.transaction_no LIKE '${enhancedVal}' OR r.first_name LIKE '${enhancedVal}') AND r.service_id != 1 AND r.service_id != 2 AND r.service_id != 3 AND r.service_id != 4 AND r.status = ? ORDER BY r.date_requested DESC LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) as count FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}' OR first_name LIKE '${enhancedVal}') AND service_id != 1 AND service_id != 2 AND service_id != 3 AND service_id != 4 AND status = ?`;

  db.query(query, [status, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error searching item", err);
      return res.status(500);
    }
    db.query(countQuery, [status], (err, count) => {
      if (err) {
        console.error("error counting items", err);
        return res.status(500);
      }
      console.log(count[0].count);
      res.status(200).json({ result, count });
    });
  });
};

const searchCertificates = (req, res) => {
  const { col, val, status, page, limit } = req.query;
  const enhancedVal = "%" + val + "%";
  const offset = Number(page - 1) * parseInt(limit);
  const query = `SELECT * FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}' OR first_name LIKE '${enhancedVal}') AND service_id IN (2, 3, 4)  AND status = ? ORDER BY date_requested DESC LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) as count FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}'  OR first_name LIKE '${enhancedVal}') AND service_id IN (2, 3, 4) AND status = ?`;

  console.log(query);
  db.query(query, [status, parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error searching item", err);
      return res.status(500);
    }
    db.query(countQuery, [status], (err, count) => {
      if (err) {
        console.error("error counting items", err);
        return res.status(500);
      }
      console.log("searches", count[0].count);
      res.status(200).json({ result, count });
    });
  });
};

const searchTransactions = (req, res) => {
  const { col, val, status, page, limit } = req.query;
  const enhancedVal = "%" + val + "%";
  const offset = Number(page - 1) * parseInt(limit);
  const query = `SELECT * FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}' OR first_name LIKE '${enhancedVal}') AND status = 'approved' AND payment_status = 'paid' ORDER BY date_requested DESC LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) as count FROM request WHERE (requested_by LIKE '${enhancedVal}' OR transaction_no LIKE '${enhancedVal}'  OR first_name LIKE '${enhancedVal}') AND status = 'approved' AND payment_status = 'paid'`;

  console.log(query);
  db.query(query, [parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error("error searching item", err);
      return res.status(500);
    }
    db.query(countQuery, (err, count) => {
      if (err) {
        console.error("error counting items", err);
        return res.status(500);
      }
      console.log("searches", count[0].count);
      res.status(200).json({ result, count });
    });
  });
};

// possible to refactor these to a single query
const approveService = (req, res) => {
  const { col, val, col2, val2, col3, val3, col4, val4, col5, val5 } =
    req.query;

  const query = `UPDATE request SET ${col} = ?, ${col2} = ?, ${col3} = ?, ${col4} = ?, transaction_date = ? WHERE ${col5} = ?`;
  db.query(
    query,
    [val, val2, val3, val4, new Date(), Number(val5)],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "error!" });
      } else {
        res.status(200).json({ message: "success!" });
      }
    }
  );
};
const approveIntention = (req, res) => {
  const { col, val, col2, val2, col3, val3, col4, val4 } = req.query;
  console.log(req.query);
  const query = `UPDATE request SET ${col} = ?, ${col2} = ?, ${col3} = ?, transaction_date = ? WHERE ${col4} = ?`;
  db.query(query, [val, val2, val3, new Date(), val4], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({ message: "success!" });
    }
  });
  console.log(query);
};

// may be used for approval/cancellation/printing??
const approveDynamic = (req, res) => {
  const { col, val, col2, val2, col3, val3, col4, val4 } = req.query;
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

  if (col3 && val3) {
    setClause.push(`${col3} = ?`);
    values.push(val3);
  }

  if (setClause.length == 0 || setClause == null) {
    return res.status(400).json({ message: "no data to update" });
  }

  if (col4 && val4) {
    values.push(val4);
    const query = `UPDATE request SET ${setClause.join(", ")} WHERE ${col4}=?`;
    db.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "update failed." });
      }
      res.status(200).json({ message: "successful update" });
    });
    console.log(query);
  }
};

const levenshtein = require("fastest-levenshtein");

const searchCertRecords = (req, res) => {
  const {
    first_name,
    last_name,
    middle_name,
    contact_no,
    mother_name,
    father_name,
    birth_place,
    spouse_name = {},
    preferred_date,
    birth_date,
  } = req.query;
  const { firstName, middleName, lastName } = spouse_name;
  console.log(req.query);

  const serviceId = req.query.service_id;

  let query = "";
  const queryParams = [];

  if (parseInt(serviceId) === 14) {
    // For confirmation records
    query = `
      SELECT c.* 
      FROM confirmation c 
      WHERE (c.child_name LIKE ? 
      OR c.father_name LIKE ? 
      OR c.mother_name LIKE ? 
      OR c.preferred_date LIKE ?
      OR c.contact_no LIKE ?
      )`;
    queryParams.push(
      `%${first_name || ""}%`,
      `%${father_name || ""}%`,
      `%${mother_name || ""}%`,
      `%${preferred_date ? preferred_date.slice(0, 10) : ""}%`,
      `%${contact_no || ""}%`
    );
  } else if (parseInt(serviceId) === 7) {
    // For wedding records
    query = `
      SELECT r.*, w.spouse_firstName, w.spouse_middleName, w.spouse_lastName
      FROM request r
      JOIN wedding w ON r.requestID = w.request_id
      WHERE r.service_id = ? 
        AND (r.status = 'approved' OR r.status = 'finished')
        AND (
          (r.first_name IS NOT NULL AND r.first_name LIKE ?) 
          OR (r.last_name IS NOT NULL AND r.last_name LIKE ?) 
          OR (r.middle_name IS NOT NULL AND r.middle_name LIKE ?) 
          OR (r.contact_no IS NOT NULL AND r.contact_no LIKE ?)
          OR (w.spouse_firstName IS NOT NULL AND w.spouse_firstName LIKE ?) 
          OR (w.spouse_lastName IS NOT NULL AND w.spouse_lastName LIKE ?) 
          OR (w.spouse_middleName IS NOT NULL AND w.spouse_middleName LIKE ?) 
          OR (r.preferred_date IS NOT NULL AND r.preferred_date LIKE ?)
        )`;
    queryParams.push(
      serviceId,
      `%${first_name || ""}%`,
      `%${last_name || ""}%`,
      `%${middle_name || ""}%`,
      `%${contact_no || ""}%`,
      `%${firstName || ""}%`,
      `%${lastName || ""}%`,
      `%${middleName || ""}%`,
      `%${preferred_date ? preferred_date.slice(0, 10) : ""}%`
    );
  } else {
    query = `SELECT r.* FROM request r WHERE r.service_id = ? AND (r.status = 'approved' OR r.status = 'finished')`;
    queryParams.push(serviceId);
    if (
      first_name ||
      last_name ||
      middle_name ||
      contact_no ||
      mother_name ||
      father_name ||
      birth_place
    ) {
      query += ` AND (r.first_name LIKE ? OR r.last_name LIKE ? OR r.middle_name LIKE ? OR r.contact_no LIKE ? OR r.mother_name LIKE ? OR r.father_name LIKE ? OR r.birth_place LIKE ?)`;
      queryParams.push(
        `%${first_name || ""}%`,
        `%${last_name || ""}%`,
        `%${middle_name || ""}%`,
        `%${contact_no || ""}%`,
        `%${mother_name || ""}%`,
        `%${father_name || ""}%`,
        `%${birth_place || ""}%`
      );
    }
  }

  console.log(query);
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error retrieving matching records", err);
      return res
        .status(500)
        .json({ error: "Error retrieving matching records" });
    }

    const parsedResults = results.map((record) => {
      if (record.child_name) {
        try {
          record.child_name = JSON.parse(record.child_name);
        } catch (e) {
          console.error("Error parsing child_name", e);
        }
      }

      const matchingFields = {};
      console.log("rec", record);

      const calculateLevenshtein = (a, b) =>
        levenshtein.distance(a || "", b || "");

      if (record.child_name) {
        if (
          record.child_name.first_name &&
          calculateLevenshtein(first_name, record.child_name.first_name) <= 2
        ) {
          matchingFields.first_name = first_name;
        }
        if (
          record.child_name.middle_name &&
          middle_name &&
          calculateLevenshtein(middle_name, record.child_name.middle_name) <= 2
        ) {
          matchingFields.middle_name = middle_name;
        }
        if (
          record.child_name.last_name &&
          calculateLevenshtein(last_name, record.child_name.last_name) <= 2
        ) {
          matchingFields.last_name = last_name;
        }
      }
      if (
        record.first_name &&
        calculateLevenshtein(first_name, record.first_name) <= 2
      ) {
        matchingFields.first_name = first_name;
      }
      if (
        record.last_name &&
        calculateLevenshtein(last_name, record.last_name) <= 2
      ) {
        matchingFields.last_name = last_name;
      }
      if (
        record.middle_name &&
        middle_name &&
        calculateLevenshtein(middle_name, record.middle_name) <= 2
      ) {
        matchingFields.middle_name = middle_name;
      }
      if (
        record.contact_no &&
        calculateLevenshtein(contact_no, record.contact_no) <= 2
      ) {
        matchingFields.contact_no = contact_no;
      }
      if (
        record.mother_name &&
        calculateLevenshtein(mother_name, record.mother_name) <= 2
      ) {
        matchingFields.mother_name = mother_name;
      }
      if (
        record.father_name &&
        calculateLevenshtein(father_name, record.father_name) <= 2
      ) {
        matchingFields.father_name = father_name;
      }
      if (
        record.birth_date &&
        record.birth_date
          .toJSON()
          .slice(0, 10)
          .includes(birth_date ? birth_date.slice(0, 10) : "")
      ) {
        matchingFields.birth_date = birth_date ? birth_date.slice(0, 10) : "";
      }
      if (
        record.birth_place &&
        calculateLevenshtein(birth_place, record.birth_place) <= 2
      ) {
        matchingFields.birth_place = birth_place;
      }
      if (
        record.spouse_firstName &&
        calculateLevenshtein(firstName, record.spouse_firstName) <= 2
      ) {
        matchingFields.spouse_firstName = firstName;
      }
      if (
        record.spouse_lastName &&
        calculateLevenshtein(lastName, record.spouse_lastName) <= 2
      ) {
        matchingFields.spouse_lastName = lastName;
      }
      if (
        record.spouse_middleName &&
        middleName &&
        calculateLevenshtein(middleName, record.spouse_middleName) <= 2
      ) {
        matchingFields.spouse_middleName = middleName;
      }
      if (
        record.preferred_date &&
        preferred_date &&
        record.preferred_date
          .toJSON()
          .slice(0, 10)
          .includes(preferred_date.slice(0, 10))
      ) {
        matchingFields.preferred_date = preferred_date.slice(0, 10);
      }

      record.Matches = matchingFields;
      return record;
    });
    res.status(200).json({ results: parsedResults });
  });
};

//single column update
const updateByParams = (req, res) => {
  const { col, val, id } = req.query;
  const query = `UPDATE request SET ${col} = ? WHERE requestID = ?`;
  db.query(query, [val, id], (err, result) => {
    if (err) {
      console.error("error updating request", err);
      return res.status(500).json({ message: "error" });
    }
    res.status(200).json({ message: "success" });
  });
};

// experimental
const updateBulk = (req, res) => {
  const { formData, id } = req.body;
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
        return res.status(500).json({ message: "Error updating request" });
      }
      return res.status(200).json({ message: "Update successful" });
    }
  );
};

const updateConfirmationCert = (req, res) => {
  const { confirmationData, id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing record ID" });
  }

  const { details, ...mainFields } = confirmationData;

  const columns = Object.keys(mainFields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(mainFields);

  const detailsUpdate = `
    JSON_SET(
      details,
      '$.book_no', ?,
      '$.page_no', ?,
      '$.line_no', ?,
      '$.sponsor_no1', ?,
      '$.sponsor_no2', ?
    )
  `;
  const detailsValues = [
    details.book_no || null,
    details.page_no || null,
    details.line_no || null,
    details.sponsor_no1 || null,
    details.sponsor_no2 || null,
  ];

  const query = `
    UPDATE request 
    SET ${columns}, 
        details = ${detailsUpdate} 
    WHERE requestID = ?
  `;

  db.query(query, [...values, ...detailsValues, id], (err, result) => {
    if (err) {
      console.error("Error updating request", err);
      return res.status(500).json({ message: "Error updating request" });
    }
    return res.status(200).json({ message: "Update successful" });
  });
};

const updateCerts = (req, res) => {
  const { baptismData, id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing record ID" });
  }

  const { details, ...mainFields } = baptismData;

  const columns = Object.keys(mainFields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(mainFields);

  const detailsUpdate = `
    JSON_SET(
      details,
      '$.book_no', ?,
      '$.page_no', ?,
      '$.line_no', ?,
      '$.record_id', ?
    )
  `;
  const detailsValues = [
    details.book_no || null,
    details.page_no || null,
    details.line_no || null,
    details.record_id || null,
  ];

  const query = `
    UPDATE request 
    SET ${columns}, 
        details = ${detailsUpdate} 
    WHERE requestID = ?
  `;

  db.query(query, [...values, ...detailsValues, id], (err, result) => {
    if (err) {
      console.error("Error updating request", err);
      return res.status(500).json({ message: "Error updating request" });
    }
    return res.status(200).json({ message: "Update successful" });
  });
};

const updateMarriageCert = (req, res) => {
  const { marriageData, id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing record ID" });
  }

  const { spouse_name, details, ...mainFields } = marriageData;
  const columns = Object.keys(mainFields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(mainFields);

  const spouseUpdate = `
    JSON_SET(
      spouse_name,
      '$.firstName', ?,
      '$.middle_name', ?,
      '$.lastName', ?
    )
  `;

  const detailsUpdate = `
    JSON_SET(
      details,
      '$.book_no', ?,
      '$.page_no', ?,
      '$.line_no', ?,
      '$.record_id', ?
    )
  `;

  const spouseValues = [
    spouse_name.firstName || null,
    spouse_name.middleName || null,
    spouse_name.lastName || null,
  ];

  const detailsValues = [
    details.book_no || null,
    details.page_no || null,
    details.line_no || null,
    details.record_id || null,
  ];

  const query = `
    UPDATE request 
    SET ${columns}, spouse_name = ${spouseUpdate} ,
        details = ${detailsUpdate} 
    WHERE requestID = ?
  `;

  db.query(
    query,
    [...values, ...spouseValues, ...detailsValues, id],
    (err, result) => {
      if (err) {
        console.error("Error updating request", err);
        return res.status(500).json({ message: "Error updating request" });
      }
      return res.status(200).json({ message: "Update successful" });
    }
  );
};

const addSponsorFee = (req, res) => {
  const { requestID } = req.body;

  db.query(
    `SELECT donation FROM request WHERE requestID = ?`,
    [requestID],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving fee" });
      }

      const currentFee = result[0].donation || 0;
      const newFee = currentFee + 50.0;
      db.query(
        `UPDATE request SET donation = ? WHERE requestID = ?`,
        [newFee, requestID],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating fee" });
          }
          return res
            .status(200)
            .json({ message: "Fee updated successfully", newFee });
        }
      );
    }
  );
};

const removeSponsorFee = (req, res) => {
  const { requestID } = req.body;

  db.query(
    `SELECT donation FROM request WHERE requestID = ?`,
    [requestID],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving fee" });
      }

      const currentFee = result[0].donation || 0;
      const newFee = Math.max(0, currentFee - 50.0);

      db.query(
        `UPDATE request SET donation = ? WHERE requestID = ?`,
        [newFee, requestID],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating fee" });
          }
          return res
            .status(200)
            .json({ message: "Fee updated successfully", newFee });
        }
      );
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
  getSpecificSummary,
  retrieveMultipleParams,
  approveService,
  approveIntention,
  approveDynamic,
  retrieveMultipleDateFiltered,
  getCount,
  getUpcomingEvents,
  retrieveRequests,
  retrieveCerts,
  getCountRequests,
  getCountRequestsDateFiltered,
  getCountCerts,
  searchIntentions,
  searchRequests,
  searchCertificates,
  searchTransactions,
  searchCertRecords,
  updateByParams,
  updateBulk,
  updateConfirmationCert,
  updateCerts,
  updateMarriageCert,
  addSponsorFee,
  removeSponsorFee,
  retrieveTransactions,
};
