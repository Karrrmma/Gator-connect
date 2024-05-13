const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db')

const searchControl = require('./controllers/search');

//router.post('/search', searchControl.search)

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
//  SEARCH QUERY
router.post("/search",  (req, res) => {
  const { username, major, year } = req.body;

  let query =
    `
    SELECT Account.user_id, Account.username, COALESCE(Student.major, Professor.department) AS major_or_department, Profile.avatar 
    FROM User 
    JOIN Account ON User.user_id = Account.user_id 
    JOIN Profile ON Account.account_id = Profile.account_id 
    LEFT JOIN Student ON Account.user_id = Student.user_id
    LEFT JOIN Professor ON Account.user_id = Professor.user_id
    WHERE 1=1
    `;
  const params = [];

  if (username) {
    query += " AND Account.username LIKE ?";
    params.push("%" + username.trim() + "%");
  }
  if (major) {
    query += " AND (Student.major LIKE ? OR Professor.department LIKE ?)";
    params.push("%" + major.trim() + "%", "%"+ major.trim() + "%");
  }
  if (year) {
    query += " AND Student.year LIKE ?";
    params.push("%" + year.trim() + "%");
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error searching:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ results });
  });
});

module.exports = router;