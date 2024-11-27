// this controller handles all service and service schedules behavior

const express = require("express");
const db = require("./db");

const retrieveAll = (req, res) => {
  db.query("SELECT * FROM service", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
};

const retrieveByParams = (req, res) => {
  const service_id = req.query.id;

  db.query(
    `SELECT * FROM service WHERE serviceID = ?`,
    [service_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result[0]);
      }
    }
  );
};

// only retrieves schedules to avoid redundancy of the service data
// STRICTLY FOR MASSES
const retrieveSchedule = (req, res) => {
  const service_id = parseInt(req.query.id);
  const mass_date = req.query.date;

  db.query(
    `SELECT * FROM serviceschedule WHERE service_id = ? AND day = WEEKDAY(?) + 1`,
    [service_id, mass_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //separate all time only from schedules
        const timeArray = [];
        for (const i of result) {
          const slot = i.time;
          timeArray.push(slot);
        }

        // debugs
        // console.log(result);
        // console.log(timeArray);

        return res.status(200).json({
          schedules: result,
          slots: timeArray,
        });
      }
    }
  );
};

const updateService = (req, res) => {
  const { col, val, serviceID } = req.body;

  db.query(
    `UPDATE service SET ${col} = ? WHERE serviceID = ?`,
    [val, serviceID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ message: "Fee successfuly updated!" });
      }
    }
  );
};

// for dashboard line chart
const getCountReq = (req, res) => {
  const query = `
  SELECT 
  monthNames.month AS month, 
  IFNULL(COUNT(request.date_requested), 0) AS requestCount
FROM (
  SELECT 'January' AS month, 1 AS monthNum UNION ALL
  SELECT 'February', 2 UNION ALL
  SELECT 'March', 3 UNION ALL
  SELECT 'April', 4 UNION ALL
  SELECT 'May', 5 UNION ALL
  SELECT 'June', 6 UNION ALL
  SELECT 'July', 7 UNION ALL
  SELECT 'August', 8 UNION ALL
  SELECT 'September', 9 UNION ALL
  SELECT 'October', 10 UNION ALL
  SELECT 'November', 11 UNION ALL
  SELECT 'December', 12
) AS monthNames
LEFT JOIN request ON monthNames.monthNum = MONTH(request.date_requested) 
  AND YEAR(request.date_requested) = YEAR(CURDATE())
GROUP BY monthNames.monthNum, monthNames.month  -- Added monthNames.month here
ORDER BY monthNames.monthNum;

  `;

  ////////// QUERY FOR ONLY MONTHS WITH REQUESTS ///////////
  //  SELECT
  //   DATE_FORMAT(date_requested, '%M') AS month,
  //   COUNT(*) AS requestCount
  // FROM request
  // WHERE YEAR(date_requested) = YEAR(CURDATE())
  // GROUP BY MONTH(date_requested)
  // ORDER BY MONTH(date_requested);

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving request counts", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const counts = result.map((row) => ({
      month: row.month,
      requestCount: row.requestCount,
    }));

    res.status(200).json(counts);
  });
};

module.exports = {
  retrieveAll,
  retrieveByParams,
  retrieveSchedule,
  updateService,
  getCountReq,
};
