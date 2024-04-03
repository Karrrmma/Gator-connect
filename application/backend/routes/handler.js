const express = require('express');
const router = express.Router();

// Need to install CORS if we have our database in a diff link

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com',
    user: 'thream',
    password: 'Jose*ortiz3',
    database: 'mydb'//name of the databse within the mysql to connect to 
  });

// TODO: make this communiate with database and grab a post
router.get('/testpost', (req, res) => {
    const str = [{
        username: 'Test User',
        content: 'This is a test post!'
    }]
    res.end(JSON.stringify(str));
});

router.get('/login', (req, res) => {  
    const str = [{
        username: 'test',
        password: 'password'
    }]
    res.end(JSON.stringify(str));
});

router.post('/newpost', (req, res) => {
    res.end('To be implemented');
});




connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

function addUser(email, username, password) {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return;
      }
      console.log('User inserted successfully with ID:', results.insertId);
    });
  }
  
  addUser('kargyal@gmail.com', 'karma', '1234');

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;


  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Failed to insert user' });
      return;
    }
    res.status(200).json({ message: 'User inserted successfully' });
  });
});



  

module.exports = router;