require("dotenv").config();
const db = require("./db");

// get priests
const retrieveByParams = (req, res) => {
  const {col, val} = req.query;

  db.query(`SELECT * FROM priest where ?? = ?`, [col, val], (err, result) => {
    if (err) {
      console.error("error retrieving from db", err);
      return res.status(500);
    }
    // para dili na hasol add2 ug 'Fr.' na title sa frontend:
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

// create priest
const createPriest = (req, res) => {
  const {first_name, last_name, contact_no, year_started, year_ended, status} =
    req.body;

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
  const {date, activity, start_time, end_time, priest_id} = req.body;

  db.query(
    `INSERT INTO priestschedule (date, activity, start_time, end_time, priest_id) VALUES (?, ?, ?, ?, ?)`,
    [date, activity, start_time, end_time, priest_id],
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
    priestID,
    first_name,
    last_name,
    contact_no,
    year_started,
    year_ended,
    status,
  } = req.body;

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
        return res.status(500).json({
          error: "server error",
          status: "500",
        });
      }
      return res.status(200).json({message: "priest updates!"});
    }
  );
};

// edit priests' sched
const editSchedule = (req, res) => {
  const {schedule_id, date, activity, start_time, end_time, priest_id} =
    req.body;

  db.query(
    `UPDATE priestschedule SET date = ?, activity = ?, start_time = ?, end_time = ?, priest_id = ? WHERE schedule_id = ?`,
    [date, activity, start_time, end_time, priest_id, schedule_id],
    (err, result) => {
      if (err) {
        console.error("error updating schedule", err);
        return res.status(500).json({
          error: "server error",
          status: "500",
        });
      }
      return res.status(200).json({message: "priests sched updated"});
    }
  );
};

// delete priests' sched
const deleteSchedule = (req, res) => {
  const {schedule_id} = req.params;

  db.query(
    `DELETE FROM priestschedule WHERE schedule_id = ?`,
    [schedule_id],
    (err, result) => {
      if (err) {
        console.error("error deleting schedule", err);
        return res.status(500).json({
          error: "server error",
          status: "500",
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({error: "priest sched not found"});
      }
      return res.status(200).json({message: "pruest sched deleted"});
    }
  );
};

module.exports = {
  retrieveByParams,
  retrieveSchedules,
  createPriest,
  createSchedule,
  editPriest,
  editSchedule,
  deleteSchedule,
};
