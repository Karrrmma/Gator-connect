const express = require('express');
const router = express.Router();
const mysql = require('mysql');
router.use(express.json());

// Connect Database
const connection = mysql.createConnection({
  host: 'gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com',
  user: 'thream',
  password: 'Jose*ortiz3',
  database: 'mydb',
  charset: 'utf8mb4',
});

// Debugging Connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;
