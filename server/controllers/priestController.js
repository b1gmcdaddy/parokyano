require("dotenv").config();
const db = require("./db");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

// get priests
const retrieveByParams = (req, res) => {
  const { col, val } = req.query;

  db.query(`SELECT * FROM priest where ?? = ?`, [col, val], (err, result) => {
    if (err) {
      console.error("error retrieving from db", err);
      return res.status(500);
    }
    for (const i in result) {
      result[i].first_name = "Fr. " + result[i].first_name;
    }
    return res.status(200).send(result);
  });
};

//get priests' schedules
const retrieveSchedules = (req, res) => {
  db.query("Select * FROM priestschedule", (err, result) => {
    if (err) {
      console.error("error retrieving from scheds db", err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    return res.status(200).send(result);
  });
};

const retrieveScheduleByParams = (req, res) => {
  const { priest, date, start, end } = req.query;

  db.query(
    `SELECT s.*, p.first_name, p.last_name 
  FROM priestschedule s 
  JOIN priest p ON p.priestID = s.priest_id
  WHERE s.priest_id = ? 
    AND s.date = ?
    AND (
      (s.start_time <= '${start}' AND s.end_time >= '${end}') OR
      (s.start_time >= '${start}' AND s.start_time < '${end}') OR
      (s.end_time > '${start}' AND s.end_time <= '${end}')
    )`,
    [priest, date.substring(0, 10)],
    (err, result) => {
      if (err) {
        console.error("error retrieving from scheds db", err);
        return res.status(500).json({
          error: "server error",
          status: "500",
        });
      }
      if (result.length > 0) {
        console.log("priest sched found!", result[0]);
        let startTimeFormatted = dayjs(result[0].start_time, "HH:mm:ss").format(
          "hh:mm A"
        );
        let endTimeFormatted = dayjs(result[0].end_time, "HH:mm:ss").format(
          "hh:mm A"
        );
        let priestName = `${result[0].first_name} ${result[0].last_name}`;

        const message = `${priestName} has a scheduled service from ${startTimeFormatted} to ${endTimeFormatted}`;
        const details = "Service: " + result[0].activity;
        return res.status(409).send({ message, details });
      } else {
        return res.status(200).send();
      }
    }
  );
};

const retrieveScheduleVenue = (req, res) => {
  const { date, start, end } = req.query;

  const query = `
    SELECT s.*
    FROM priestschedule s
    JOIN request r ON r.requestID = s.request_id
    WHERE r.service_id IN (5, 6, 7, 11)
      AND s.date = ?
      AND (
         (s.start_time <= ? AND s.end_time >= ?) OR  
        (s.start_time <= ? AND s.end_time >= ?) OR 
        (s.start_time >= ? AND s.end_time <= ?) OR   
        (s.start_time <= ? AND s.end_time >= ?)   
      )
  `;

  const params = [
    date.substring(0, 10),
    start,
    start,
    end,
    end,
    start,
    end,
    start,
    end,
  ];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("error retrieving from scheds db", err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    if (result.length > 0) {
      console.log("venue sched found!", result[0]);
      return res.status(200).send({ message: `Unavailable` });
    } else {
      return res.status(200).send({ message: "Available" });
    }
  });
};

// create priest
const createPriest = (req, res) => {
  const {
    first_name,
    last_name,
    contact_no,
    year_started,
    year_ended,
    status,
  } = req.body;

  db.query(
    `INSERT INTO priest (first_name, last_name, contact_no, year_started, year_ended, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, contact_no, year_started, year_ended, status],
    (err, result) => {
      if (err) {
        console.error("error creating priest", err);
        return res.status(500);
      }
      return res.status(200);
    }
  );
};

// create priest schedule
const createSchedule = (req, res) => {
  const { date, activity, start_time, end_time, priest_id, request_id } =
    req.body;

  db.query(
    `INSERT INTO priestschedule (date, activity, start_time, end_time, priest_id, request_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [date, activity, start_time, end_time, priest_id, request_id || null],
    (err, result) => {
      if (err) {
        console.error("error creating schedule", err);
        return res.status(500);
      }
      return res.status(200);
    }
  );
};

// edit priest
const editPriest = (req, res) => {
  const {
    first_name,
    last_name,
    contact_no,
    year_started,
    year_ended,
    status,
  } = req.body;
  const priestID = req.params.priestID;

  db.query(
    `UPDATE priest SET first_name = ?, last_name = ?, contact_no = ?, year_started = ?, year_ended = ?, status = ? WHERE priestID = ?`,
    [
      first_name,
      last_name,
      contact_no,
      year_started,
      year_ended,
      status,
      priestID,
    ],
    (err, result) => {
      if (err) {
        console.error("error updating priest", err);
        return res.status(500).send("Error updating priest");
      }
      return res.status(200).send("Priest updated successfully");
    }
  );
};

// edit priests' sched
const editSchedule = (req, res) => {
  const { date, activity, start_time, end_time, priest_id } = req.body;
  const scheduleID = req.params.scheduleID;

  db.query(
    `UPDATE priestschedule SET date = ?, activity = ?, start_time = ?, end_time = ?, priest_id = ? WHERE scheduleID = ?`,
    [date, activity, start_time, end_time, priest_id, scheduleID],
    (err, result) => {
      if (err) {
        console.error("Error updating schedule:", err);
        return res.status(500).json({
          error: "Server error",
          status: "500",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Schedule not found" });
      }

      return res
        .status(200)
        .json({ message: "Priest schedule updated successfully." });
    }
  );
};

const deleteSchedule2 = (req, res) => {
  const { col, val } = req.query;

  db.query(
    `DELETE FROM priestschedule WHERE ${col} = ?`,
    [val],
    (err, result) => {
      if (err) {
        console.error("error deleting schedule", err);
        return res.status(500).json({
          error: "server error",
          status: "500",
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "priest sched not found" });
      }
      return res.status(200).json({ message: "pruest sched deleted" });
    }
  );
};

const reschedule = (req, res) => {
  const { date, activity, start_time, end_time, priest_id, request_id } =
    req.body;

  // Step 1: Delete the old schedule by request_id
  db.query(
    `DELETE FROM priestschedule WHERE request_id = ?`,
    [request_id],
    (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Error deleting schedule:", deleteErr);
        return db.rollback(() => {
          res
            .status(500)
            .json({ error: "Server error during schedule deletion" });
        });
      }
      // Step 2: Insert the new schedule
      db.query(
        `INSERT INTO priestschedule (date, activity, start_time, end_time, priest_id, request_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [date, activity, start_time, end_time, priest_id, request_id],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error creating new schedule:", insertErr);
          }

          // Send success response
          return res
            .status(200)
            .json({ message: "Schedule rescheduled successfully" });
        }
      );
    }
  );
};

module.exports = {
  retrieveByParams,
  retrieveSchedules,
  retrieveScheduleByParams,
  retrieveScheduleVenue,
  createPriest,
  createSchedule,
  editPriest,
  editSchedule,
  deleteSchedule2,
  reschedule,
};
