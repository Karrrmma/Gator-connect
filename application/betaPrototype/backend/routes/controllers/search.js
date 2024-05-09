
const mysql = require("mysql");
const connection = require('../db')

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
//  SEARCH QUERY
exports.search =  (req, res) => {
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
  };
  