const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db')


const searchControl = require('./controllers/search')

//router.post('/search', searchControl.search)



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
//  SEARCH QUERY
router.post("/search", (req, res) => {
  const { username, major, year } = req.body;

  let query =
    "SELECT Account.username, Student.major FROM Account JOIN Student ON Account.user_id = Student.user_id WHERE 1=1";
  const params = [];

  if (username) {
    query += " AND Account.username LIKE ?";
    params.push("%" + username + "%");
  }
  if (major) {
    query += " AND Student.major LIKE ?";
    params.push("%" + major + "%");
  }
  if (year) {
    query += " AND Student.year LIKE ?";
    params.push("%" + year + "%");
  }
  // if (content) {
  //   query += ' AND Student.content LIKE ?';
  //   params.push('%' + content + '%');
  // }

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