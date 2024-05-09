const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
// const pool = require('../config/db.js');

// @@@ Need to install CORS if we have our database in a diff link @@@

// Connect Database
const connection = mysql.createConnection({
  host: "gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com",
  user: "thream",
  password: "Jose*ortiz3",
  database: "mydb",
});

// Debugging Connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

module.exports = connection;