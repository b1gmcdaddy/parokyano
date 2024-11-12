require("dotenv").config();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const db = require("./db");
const {has} = require("lodash");

const retrieveAllUsers = (req, res) => {
  db.query("Select * FROM user", (err, result) => {
    if (err) {
      console.error("error retrieving users from db", err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    return res.status(200).send(result);
  });
};

const retrieveByParams = (req, res) => {
  const user = req.query.id;
  db.query(`SELECT * FROM user WHERE userID = ?`, [user], (err, result) => {
    if (err) {
      console.error("error retrieving user from db", err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    return res.status(200).json(result);
  });
};

const dateToday = new Date().toJSON().slice(0, 10);

const createUser = async (req, res) => {
  const data = req.body;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  console.log(hashedPassword);

  db.query(
    "INSERT INTO user (first_name, last_name, user_type, date_started, contact_no, email, username, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      data.first_name,
      data.last_name,
      data.user_type,
      dateToday,
      data.contact_no,
      data.email,
      data.username,
      hashedPassword,
      data.status,
    ],
    (err, result) => {
      if (err) {
        console.error("error submitting to db", err);
        return res.status(500);
      }
      return res.status(200).json({message: "User created successfully"});
    }
  );
};

const editUser = (req, res) => {
  const data = req.body;
  const userID = req.params.id;

  db.query(
    "UPDATE user SET first_name=?, last_name=?, email=?, contact_no=?, username=?, status=? WHERE userID=?",
    [
      data.first_name,
      data.last_name,
      data.email,
      data.contact_no,
      data.username,
      data.status,
      userID,
    ],
    (err, result) => {
      if (err) {
        console.error("error updating user", err);
        return res.status(500);
      }
      return res.status(200).json({message: "User updated successfully"});
    }
  );
};

const getUsersWithLatestActivity = (req, res) => {
  const query = `
    SELECT u.*, 
           l.activity, 
           l.date AS last_activity
    FROM user u
    LEFT JOIN (
      SELECT user_id, activity, MAX(date) AS date
      FROM logs
      GROUP BY user_id
    ) l ON u.userID = l.user_id;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "server error",
        status: "500",
      });
    }
    return res.status(200).json(result);
  });
};

module.exports = {
  retrieveAllUsers,
  retrieveByParams,
  createUser,
  editUser,
  getUsersWithLatestActivity,
};
