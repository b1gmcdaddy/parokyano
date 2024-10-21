require("dotenv").config();

const db = require("./db");
const dateToday = new Date().toJSON().slice(0, 10);

const retrieveAll = (req, res) => {
  db.query("Select * FROM announcement", (err, result) => {
    if (err) {
      console.error("error retrieving from db", err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    return res.status(200).send(result);
  });
};

const createAnnouncement = (req, res) => {
  const data = req.body;
  const user = data.user_id;

  db.query(
    "INSERT INTO announcement (title, description, date_announced, user_id) VALUES (?, ?, ?, ?)",
    [data.title, data.description, dateToday, user],
    (err, result) => {
      if (err) {
        console.error("error submitting to db", err);
        return res.status(500);
      }
      return res.status(200);
    }
  );
};

const editAnnouncement = (req, res) => {
  const data = req.body;
  const announcementID = req.params.id;

  db.query(
    "UPDATE announcement SET title=?, description=? WHERE announcementID=?",
    [data.title, data.description, announcementID],
    (err, result) => {
      if (err) {
        console.error("error updating db", err);
        return res.status(500);
      }
      return res.status(200);
    }
  );
};

const deleteAnnouncement = (req, res) => {
  const announcementID = req.params.announcementID;

  db.query(
    "DELETE FROM announcement WHERE announcementID = ?",
    [announcementID],
    (err, result) => {
      if (err) {
        console.error("Error deleting announcement from db:", err);
        return res.status(500).json({message: "Internal Server Error"});
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({message: "Announcement not found"});
      }
      return res
        .status(200)
        .json({message: "Announcement deleted successfully"});
    }
  );
};

module.exports = {
  retrieveAll,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
};
