const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const pool = require('../config/db.js');

// Need to install CORS if we have our database in a diff link

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com',
    user: 'thream',
    password: 'Jose*ortiz3',
    database: 'mydb'//name of the databse within the mysql to connect to 
});


  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
  
  
  
router.get('/chat', (req ,res) => {
/*   console.log("das ist ein Test")
 */
  const test = 'SELECT * FROM Account';
  connection.query(test, async (err, results)=>{
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.send(JSON.stringify(results))
  });
})

  


// TODO: make this communiate with database and grab a post
router.get('/testpost', (req, res) => {
    const str = [{
        username: 'Ali Gator',
        content: 'Hello! This is a test content!'
    }]
    res.end(JSON.stringify(str));
});

// log in user query 
router.post('/login', (req, res) => {  
    const{username, password} = req.body;
    const query = 'SELECT * FROM Account WHERE username = ?';
    connection.query(query, [username], async (err, results)=>{
      // console.log(username, password)
      // console.log(results);
      // console.log(err);
      if(err){
        console.error('Erro getting the username and password', err);
        return res.status(500).json({ error: 'Internal Server Error' });;
      }
      if(results.length === 0){
        return res.status(401).json({error:'invalid username or password'});
      }
      const user = results[0];
      console.log('hashed password from database', user.password);
      console.log('client password', password);
      

      const hashCheck =  bcrypt.compare(password, user.password);
      console.log('client password', hashCheck);
      if(!hashCheck){
        return res.status(401).json({error: 'invalid password'});
      }
    
      const token = jwt.sign({username: user.username, user_id: user.user_id}, 
        'token_key', {expiresIn:'1h'});
        
        // send user a token
      res.status(200).json({
        message:'login success',
        token: token
      });
        // res.redirect('/home')

      
    });
    });
   
// router.post('/newpost', (req, res) => {
//     res.end('To be implemented');
// });

router.post('/newpost', (req, res) => {
  // Destructuring the required fields from the request body
  const { post_content, user_id } = req.body;

  // query the data
  const query = `
      INSERT INTO Post (post_content, post_time, num_likes, num_comments, user_id)
      VALUES (?, NOW(), 0, 0, ?)
  `;
  //get data from frontend
  const queryParams = [post_content, user_id];

  // execute the query by subbing the data into ?
  connection.query(query, queryParams, (error, results) => {
      if (error) {
          console.error('Error inserting new post:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Success
      return res.status(201).json({
          message: 'New post created successfully',
          post: {
              post_id: results.insertId,
              post_content,
              post_time: new Date(),  
              num_likes: 0,
              num_comments: 0,
              user_id
          }
      });
  });
});


// router.post('/search')


//Function just to add users /// just use to test
function addUser(sfsu_email, username, password, fullName, major, year, callback) {
  const userQuery = 'INSERT INTO User (full_name, sfsu_email) VALUES (?, ?)';
  const accountQuery = 'INSERT INTO Account(username, password, user_id) VALUES(?, ?, ?)';
  const studentQuery = 'INSERT INTO Student(user_id, major, year) VALUES(?, ?, ?)';

  connection.query(userQuery, [fullName, sfsu_email], (userErr, userResult) => {
      if (userErr) {
          console.error('Error inserting user:', userErr);
          return callback(userErr);
      }

      connection.query(accountQuery, [username, password, userResult.insertId], (accountErr, accountResult) => {
          if (accountErr) {
              console.error('Error inserting account:', accountErr);
              return callback(accountErr);
          }

          connection.query(studentQuery, [userResult.insertId, major, year], (studentErr, studentResult) => {
              if (studentErr) {
                  console.error('Error inserting student:', studentErr);
                  return callback(studentErr);
              }

              callback(null, { userId: userResult.insertId, accountId: accountResult.insertId });
          });
      });
  });
}

// Usage example:

// addUser('kargdsdsdyal@sfsu.edu', 'karddsdsdsma', '1234', 'KaSrma Gyalpo', 'Computer Science', '2022', (err, result) => {
//   if (err) {
//       console.error('Error adding user:', err);
//   } else {
//       console.log('User added successfully:', result);
//   }
// });




// Register query for sign up form 

  router.post('/register', (req, res) => {
    const { fullname, sfsu_email, username, password, major, year } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const studentQuery = 'INSERT INTO Student(user_id, major, year) VALUES(?, ?, ?)';
    const accountQuery = 'INSERT INTO Account(username, password, user_id) VALUES(?,?,?)';
    const userQuery = 'INSERT INTO User (full_name, sfsu_email) VALUES (?, ?)';
    connection.query(userQuery, [fullname, sfsu_email], (userErr, userResult) => {
      if (userErr) {
        console.error('Error inserting user:', userErr);
        return res.status(500).json({ error: 'Failed to insert user' });
      }
        connection.query(accountQuery, [username, hash, userResult.insertId], (accountErr, accountResult) => {
          if (accountErr) {
            console.error('Error inserting account:', accountErr);
            return res.status(500).json({ error: 'Failed to insert account' });
          }
      
          connection.query(studentQuery, [userResult.insertId, major, year], (studentErr, studentResult) => {
            if (studentErr) { // Changed from accountErr to studentErr
                console.error('Error inserting student:', studentErr);
                return res.status(500).json({ error: 'Failed to insert student' });
            }
            res.status(200).json({ message: 'User, account, and student inserted successfully', userId: userResult.insertId, accountId: accountResult.insertId });
        });
        
        });
      



    });
  });


//                  SEARCH QUERY 
router.post('/search', (req, res) => {
  const { username, major, year } = req.body;

  let query = 'SELECT Account.username, Student.major FROM Account JOIN Student ON Account.user_id = Student.user_id WHERE 1=1';
  const params = [];

  if (username) {
      query += ' AND Account.username LIKE ?';
      params.push('%' + username + '%');
  }
  if (major) {
      query += ' AND Student.major LIKE ?';
      params.push('%' + major + '%');
  }
  if (year) {
    query += ' AND Student.year LIKE ?';
    params.push('%' + year + '%');
}
  // if (content) {
  //   query += ' AND Student.content LIKE ?';
  //   params.push('%' + content + '%');
  // }


  connection.query(query, params, (err, results) => {
      if (err) {
          console.error('Error searching:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.json({ results });
  });
});

// Get user info by ID

router.get('/api/user/:user_id', (req, res) => {
  const { user_id } = req.params;

  const query = 'SELECT major, year FROM Student WHERE user_id = ?';

  connection.query(query, [user_id], (error, results) => {
      if (error) {
          console.error('Error fetching student:', error);
          return res.status(500).json({ error: 'Failed to fetch student' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json(results[0]);
  });
});  

module.exports = router;