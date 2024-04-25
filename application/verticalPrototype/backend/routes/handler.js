const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
// const pool = require('../config/db.js');

// Need to install CORS if we have our database in a diff link


// Connect Database
const connection = mysql.createConnection({
  host: "gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com",
  user: "thream",
  password: "Jose*ortiz3",
  database: "mydb", //name of the databse within the mysql to connect to
});

// Debugging Connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});


// ***************************** Register ************************************
// ***************************** Register ************************************

// Register query for sign up form
router.post("/register", (req, res) => {
  const { fullname, sfsu_email, username, password, major, year } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const studentQuery =
    "INSERT INTO Student(user_id, major, year) VALUES(?, ?, ?)";
  const accountQuery =
    "INSERT INTO Account(username, password, user_id) VALUES(?,?,?)";
  const userQuery = "INSERT INTO User (full_name, sfsu_email) VALUES (?, ?)";
  connection.query(userQuery, [fullname, sfsu_email], (userErr, userResult) => {
    if (userErr) {
      console.error("Error inserting user:", userErr);
      return res.status(500).json({ error: "Failed to insert user" });
    }
    console.log("Password at registration:", password);
    connection.query(
      accountQuery,
      [username, hash, userResult.insertId],
      (accountErr, accountResult) => {
        if (accountErr) {
          console.error("Error inserting account:", accountErr);
          return res.status(500).json({ error: "Failed to insert account" });
        }

        connection.query(
          studentQuery,
          [userResult.insertId, major, year],
          (studentErr, studentResult) => {
            if (studentErr) {
              // Changed from accountErr to studentErr
              console.error("Error inserting student:", studentErr);
              return res
                .status(500)
                .json({ error: "Failed to insert student" });
            }
            res.status(200).json({
              message: "User, account, and student inserted successfully",
              userId: userResult.insertId,
              accountId: accountResult.insertId,
            });
          }
        );
      }
    );
  });
});

// ***************************** Login ************************************
// ***************************** Login ************************************
// log in user query
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Received username:", username);

  const query = "SELECT * FROM Account WHERE username = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error accessing database:", err);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];

    console.log("Password at login:", password);

    console.log("Hashed password from database:", user.password);
    try {
      const hashCheck = await bcrypt.compare(password, user.password);
      console.log("Result of bcrypt comparison:", hashCheck);

      if (!hashCheck) {
        console.log("Password does not match");
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { username: user.username, user_id: user.user_id },
        "your_secret_key",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (compareError) {
      console.error("Password comparison failed:", compareError);
      return res.status(500).json({
        error: "Error during password verification",
        details: compareError.message,
      });
    }
  });
});

// *******************************************************************************

router.get("/chat", (req, res) => {
  /*   console.log("das ist ein Test")
   */
  const test = "SELECT * FROM Account";
  connection.query(test, async (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.send(JSON.stringify(results));
  });
});

// TODO: make this communiate with database and grab a post
router.get("/testpost", (req, res) => {
  const str = [
    {
      username: "Ali Gator",
      content: "Hello! This is a test content!",
    },
  ];
  res.end(JSON.stringify(str));
});

// router.post('/newpost', (req, res) => {
//     res.end('To be implemented');
// });

router.post("/newpost", (req, res) => {
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
      console.error("Error inserting new post:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Success
    return res.status(201).json({
      message: "New post created successfully",
      post: {
        post_id: results.insertId,
        post_content,
        post_time: new Date(),
        num_likes: 0,
        num_comments: 0,
        user_id,
      },
    });
  });
});

// router.post('/search')

//Function just to add users /// just use to test
function addUser(
  sfsu_email,
  username,
  password,
  fullName,
  major,
  year,
  callback
) {
  const userQuery = "INSERT INTO User (full_name, sfsu_email) VALUES (?, ?)";
  const accountQuery =
    "INSERT INTO Account(username, password, user_id) VALUES(?, ?, ?)";
  const studentQuery =
    "INSERT INTO Student(user_id, major, year) VALUES(?, ?, ?)";

  connection.query(userQuery, [fullName, sfsu_email], (userErr, userResult) => {
    if (userErr) {
      console.error("Error inserting user:", userErr);
      return callback(userErr);
    }

    connection.query(
      accountQuery,
      [username, password, userResult.insertId],
      (accountErr, accountResult) => {
        if (accountErr) {
          console.error("Error inserting account:", accountErr);
          return callback(accountErr);
        }

        connection.query(
          studentQuery,
          [userResult.insertId, major, year],
          (studentErr, studentResult) => {
            if (studentErr) {
              console.error("Error inserting student:", studentErr);
              return callback(studentErr);
            }

            callback(null, {
              userId: userResult.insertId,
              accountId: accountResult.insertId,
            });
          }
        );
      }
    );
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

//                  SEARCH QUERY
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

// *******************************************************************************************************************
// Profile  DETAIL
router.get("/api/user/:user_id", (req, res) => {
  const { user_id } = req.params;
  //gets imformation of below from USER, POST, Friend , STUDENT table as combines in to a table based on the user_id
  const query = `SELECT 
                  User.user_id,
                  User.full_name AS fullName,
                  User.sfsu_email AS sfsu_email,
                  Student.major, 
                  COUNT(Post.post_id) AS post_count,
                  COUNT(DISTINCT CASE WHEN Friend_Request.status = 'accepted' THEN Friend_Request.friend_request_id END) AS friend_accepted_count,
                  COUNT(DISTINCT CASE WHEN Friend_Request.status = 'declined' THEN Friend_Request.friend_request_id END) AS friend_declined_count
                FROM
                    User
                LEFT JOIN Student ON User.user_id = Student.user_id
                LEFT JOIN Post ON User.user_id = Post.user_id
                LEFT JOIN Friend_Request ON (User.user_id = Friend_Request.requester_id OR User.user_id = Friend_Request.receiver_id)

                WHERE
                    User.user_id = ?
                GROUP BY
                    User.user_id`;

  connection.query(query, [user_id], (error, results) => {
    if (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = results[0];
    const postQuery = "SELECT * FROM Post WHERE user_id = ?";
    connection.query(postQuery, [user_id], (postError, postResults) => {
      if (postError) {
        console.error("Error fetching user posts:", postError);
        return res.status(500).json({ error: "Failed to fetch user posts" });
      }

      profile.posts = postResults;
      res.status(200).json(profile);
    });
  });
});

// Get user info by ID, OBSOLETE

// router.get('/api/user/:user_id', (req, res) => {
//   const { user_id } = req.params;

//   const query = 'SELECT major, year FROM Student WHERE user_id = ?';

//   connection.query(query, [user_id], (error, results) => {
//       if (error) {
//           console.error('Error fetching student:', error);
//           return res.status(500).json({ error: 'Failed to fetch student' });
//       }

//       if (results.length === 0) {
//           return res.status(404).json({ error: 'Student not found' });
//       }

//       res.status(200).json(results[0]);
//   });
// });

// *******************************************************************************************************************
// VENDOR DETAIL
// Insert the data in the Food Vendor from Backend (VendorDetail.js)
router.post("/vendordetail", (req, res) => {
  const { menu_rating, menu_review, vendor_name, menu_name } = req.body;
  const query = `
      INSERT INTO Food_Vendor (menu_rating, menu_review, vendor_name, menu_name)
      VALUES (?, ?, ?, ?)
  `; // Make sure the query reflects the correct number of placeholders

  connection.query(
    query,
    [menu_rating, menu_review, vendor_name, menu_name],
    (error, results) => {
      if (error) {
        console.error("Error inserting menu item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res
          .status(201)
          .json({
            message: "Menu item added successfully",
            id: results.insertId,
          });
      }
    }
  );
});

router.get("/vendordetail/:vendor_name", (req, res) => {
  const { vendor_name } = req.params;

  const query = `
    SELECT menu_name, menu_rating, menu_review
    FROM Food_Vendor
    WHERE vendor_name = ?
  `;

  connection.query(query, [vendor_name], (error, results) => {
    if (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res
          .status(404)
          .json({ message: "No menu items found for this vendor." });
      }
    }
  });
});

// *******************************************************************************************************************
// FoodVendor Average Rating
router.get("/vendor-average-ratings", (req, res) => {
  const query = `
    SELECT vendor_name, AVG(menu_rating) as average_rating, COUNT(menu_rating) as num_reviews
    FROM Food_Vendor
    GROUP BY vendor_name
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});
module.exports = router;
