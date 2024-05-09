const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
 const pool = require('../config/db.js');

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

/*
// Server-side Register validation
function validateRegister(req, res, next) {
  const { fullname, sfsu_email, username, password, major, year } = req.body;
  if (!fullname || !sfsu_email || !username || !password || !major) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!/^[\w-]+(\.[\w-]+)*@sfsu.edu$/.test(sfsu_email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (password.length < 8 || !/\d/.test(password)) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long and contain a number",
    });
  }

  next();
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Register @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
// Register query for sign up form
router.post("/register", validateRegister, (req, res) => {
  const { fullname, sfsu_email, username, password, major, year, role } =
    req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const userQuery = "INSERT INTO User (full_name, sfsu_email) VALUES (?, ?)";
  const accountQuery =
    "INSERT INTO Account(username, password, created_time, user_id) VALUES(?, ?, DATE_SUB(NOW(), INTERVAL 7 HOUR), ?)";
  const profileQuery = "INSERT INTO Profile (biography, avatar, account_id) VALUES (NULL, NULL, ?)";
  connection.query(userQuery, [fullname, sfsu_email], (userErr, userResult) => {
    if (userErr) {
      console.error("Error inserting user:", userErr);
      return res.status(500).json({ error: "Failed to insert user" });
    }

    connection.query(
      accountQuery,
      [username, hash, userResult.insertId],
      (accountErr, accountResult) => {
        if (accountErr) {
          console.error("Error inserting account:", accountErr);
          return res.status(500).json({ error: "Failed to insert account" });
        }

        connection.query(
          profileQuery,
          [accountResult.insertId],
          (profileErr, profileResult) => {
            if (profileErr) {
              console.error("Error inserting profile:", profileErr);
              return res.status(500).json({ error: "Failed to insert profile" });
            }
          })
        // Conditionally handle the role of the user
        // when user == student
        if (role === "Student") {
          const studentQuery =
            "INSERT INTO Student(user_id, major, year) VALUES(?, ?, ?)";
          connection.query(
            studentQuery,
            [userResult.insertId, major, year],
            (studentErr, studentResult) => {
              if (studentErr) {
                console.error("Error inserting student:", studentErr);
                return res
                  .status(500)
                  .json({ error: "Failed to insert student" });
              }
              res.json({
                message:
                  "User, account, and student details inserted successfully",
              });
            }
          );
          // when user == professor
        } else if (role === "Professor") {
          const professorQuery =
            "INSERT INTO Professor(user_id, department) VALUES(?, ?)";
          connection.query(
            professorQuery,
            [userResult.insertId, major],
            (professorErr, professorResult) => {
              if (professorErr) {
                console.error("Error inserting professor:", professorErr);
                return res
                  .status(500)
                  .json({ error: "Failed to insert professor" });
              }
              res.json({
                message:
                  "User, account, and professor details inserted successfully",
              });
            }
          );
        }
      }
    );
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Login @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
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
*/

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Reset Password
/*
router.post("/reset-password", async (req, res) => {
  const { username, email, newPassword } = req.body;

  try {
    // Verify that the username and email match an existing user by joining Account and User tables
    const userQuery = `
      SELECT a.username, a.password
      FROM Account a
      JOIN User u ON a.user_id = u.user_id
      WHERE a.username = ? AND u.sfsu_email = ?`; // match of username and email !!

    connection.query(userQuery, [username, email], async (err, results) => {
      if (results.length === 0) {
        return res.status(404).json({ error: "No matching user found" });
      }

      // Check if the new password is the same as the old password
      const user = results[0];
      const passwordMatch = await bcrypt.compare(newPassword, user.password);
      if (passwordMatch) {
        return res.status(400).json({
          error: "New password cannot be the same as the current password",
        });
      }

      // If the new password is different, proceed to update password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updateQuery = "UPDATE Account SET password = ? WHERE username = ?";
      connection.query(
        updateQuery,
        [hashedPassword, username],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating password:", updateErr);
            return res.status(500).json({ error: "Failed to update password" });
          }

          if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: "Failed to update password" });
          }
          console.log("\n Username: ", username);
          console.log("New Password:", newPassword);
          console.log("New password with hash:", hashedPassword);

          res.json({ message: "Password updated successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
*/

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Edit profile, especially for biography
router.post('/editprofile', (req, res) => {
  const { account_id, biography } = req.body;

  const profileQuery = 'UPDATE Profile SET biography = ? WHERE account_id = ?';

  connection.query(profileQuery, [biography, account_id], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }

    res.send({ message: 'Profile updated successfully' });
  });
});


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Add New Post

/*

router.post("/newpost", (req, res) => {
  console.log("Received post data:", req.body);
  const { post_content, user_id } = req.body;

  if (!post_content) {
    return res.status(400).json({ error: "Post content required." });
  }

  if (typeof post_content !== "string" || typeof user_id !== "number") {
    return res.status(400).json({
      error:
        "Invalid data format: post_content must be a string and user_id must be a number.",
    });
  }

  const query = `
  INSERT INTO Post (post_content, post_time, num_likes, num_comments, user_id)
  VALUES (?, DATE_SUB(NOW(), INTERVAL 7 HOUR), 0, 0, ?)
  `;
  const queryParams = [post_content, user_id]; 

  // Execute the query
  connection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error inserting new post:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        sqlError: error.sqlMessage,
      });
    }

    // On success, send back the details of the new post
    res.status(201).json({
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


// GET all posts
router.get("/posts", async (req, res) => {
  // Modify the query to retrieve post components and full_name from User table
  // Those Select components are useful in navigating home --> each profile (post.user_id)
  const query = `
      SELECT Post.post_id, Post.post_content, Post.post_time, Post.num_likes, Post.num_comments, User.full_name, Post.user_id
      FROM Post
      JOIN User ON Post.user_id = User.user_id 
      ORDER BY Post.post_time DESC
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
*/
/*
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
// @@@@@ CHAT

//------put public Message to DB----//
router.post("/api/chat/sendPublicMessage", (req, res) => {
  const { sender_id, message_content, message_type } = req.body;
  const date = new Date();


  const insertMessageInformation = `INSERT INTO Public_Message (message_time, message_content, message_type, sender_id) VALUES (?, ?, ?, ?)`;

  connection.query(insertMessageInformation,[date, message_content, message_type, sender_id],(insertErr, insertResult) => {
      if (insertErr) {
        console.error("SQL Error on insert:", insertErr);
        return res.status(500).send({
          message: "Failed to send public Message",
          error: insertErr.message,
        });
      }
      res.send({
        message: "Public Message sent!",
//        requestId: insertResult.insertId,
      });
    }
  );
});



//------Fetch public Messages----//
router.get("/api/chat/getPublicMessages/:message_type", (req, res) => {
  const {message_type} = req.params;
  const getPublicMessages = `SELECT * FROM Public_Message WHERE message_type = ?`;

  connection.query(getPublicMessages, [message_type], async(err, results) => {
    if(err){
      console.error('Error fetching public Messages from DB: ', err);
      return res.status(500).json({ error: "Failed to fetch public Messages" });
    }
    
    //format Date
    const results_formatted = results.map(item => {
      const formattedDate = (item.message_time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      return {...item, message_time: formattedDate}
    })

    res.status(200).json(results_formatted);
  })
})

*/
/*
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
*/

/*
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Profile  DETAIL
router.get("/api/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  // user year to add to the profile
  const query = `
  SELECT 
    User.user_id,
    User.full_name AS fullName,
    User.sfsu_email AS sfsu_email,
    Student.major AS major,
    Student.year AS year,
    Professor.department AS department,
    Profile.biography,
    CASE 
      WHEN Student.user_id IS NOT NULL THEN 'Student'
      WHEN Professor.user_id IS NOT NULL THEN 'Professor'
    ELSE 'Unknown'
    END AS role,
    Account.username,
    (SELECT COUNT(*) FROM Post WHERE Post.user_id = User.user_id) AS post_count,  -- Ensure this only counts posts
    (SELECT COUNT(*) FROM Friend_Request WHERE (Friend_Request.receiver_id = User.user_id OR Friend_Request.requester_id = User.user_id) AND Friend_Request.status = 'accepted') AS friend_count
    FROM User
    LEFT JOIN Student ON User.user_id = Student.user_id
    LEFT JOIN Professor ON User.user_id = Professor.user_id
    LEFT JOIN Account ON User.user_id = Account.user_id
    LEFT JOIN Profile ON Account.account_id = Profile.account_id
    WHERE User.user_id = ?
    GROUP BY User.user_id;`;

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
*/


/*
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Like
// Add a like to the database and increment the num_likes in Post table
router.post("/api/likes", (req, res) => {
  const { user_id, post_id } = req.body;
  const insertLikeQuery = "INSERT INTO `Like` (user_id, post_id) VALUES (?, ?)";
  const incrementLikesQuery =
    "UPDATE Post SET num_likes = num_likes + 1 WHERE post_id = ?";

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Transaction Begin Error:", err);
      return res.status(500).json({ error: "Transaction Begin Error" });
    }

    connection.query(insertLikeQuery, [user_id, post_id], (error, results) => {
      if (error) {
        console.error("Error adding like:", error);
        return connection.rollback(() => {
          res.status(500).json({ error: "Failed to add like" });
        });
      }

      connection.query(incrementLikesQuery, [post_id], (error) => {
        if (error) {
          console.error("Error incrementing like count:", error);
          return connection.rollback(() => {
            res.status(500).json({ error: "Failed to increment like count" });
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error("Transaction Commit Error:", err);
            return connection.rollback(() => {
              res.status(500).json({ error: "Transaction Commit Error" });
            });
          }
          res.status(201).json({ message: "Like added successfully" });
        });
      });
    });
  });
});

// Remove a like from the database and decrement the num_likes in Post table
router.delete("/api/likes", (req, res) => {
  const { user_id, post_id } = req.body;
  const deleteLikeQuery =
    "DELETE FROM `Like` WHERE user_id = ? AND post_id = ?";
  const decrementLikesQuery =
    "UPDATE Post SET num_likes = num_likes - 1 WHERE post_id = ? AND num_likes > 0";

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Transaction Begin Error:", err);
      return res.status(500).json({ error: "Transaction Begin Error" });
    }

    connection.query(deleteLikeQuery, [user_id, post_id], (error) => {
      if (error) {
        console.error("Error removing like:", error);
        return connection.rollback(() => {
          res.status(500).json({ error: "Failed to remove like" });
        });
      }

      connection.query(decrementLikesQuery, [post_id], (error) => {
        if (error) {
          console.error("Error decrementing like count:", error);
          return connection.rollback(() => {
            res.status(500).json({ error: "Failed to decrement like count" });
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error("Transaction Commit Error:", err);
            return connection.rollback(() => {
              res.status(500).json({ error: "Transaction Commit Error" });
            });
          }
          res.status(200).json({ message: "Like removed successfully" });
        });
      });
    });
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Write comment
router.post("/api/comments", (req, res) => {
  const { user_id, post_id, comment_content } = req.body;
  const insertCommentQuery = "INSERT INTO `Comment` (user_id, post_id, comment_content, comment_time) VALUES (?, ?, ?, DATE_SUB(NOW(), INTERVAL 7 HOUR))";
  
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Transaction Begin Error:", err);
      return res.status(500).json({ error: "Transaction Begin Error" });
    }

    connection.query(insertCommentQuery, [user_id, post_id, comment_content], (error, results) => {
      if (error) {
        console.error("Error adding comment:", error);
        return connection.rollback(() => {
          res.status(500).json({ error: "Failed to add comment" });
        });
      }

      const fetchLastInsertQuery = `
        SELECT c.comment_id, c.user_id, c.comment_content, c.comment_time, u.full_name
        FROM Comment AS c
        INNER JOIN User AS u ON c.user_id = u.user_id
        WHERE c.comment_id = LAST_INSERT_ID()
      `;

      connection.query(fetchLastInsertQuery, (error, results) => {
        if (error) {
          return connection.rollback(() => {
            res.status(500).json({ error: "Failed to fetch last inserted comment" });
          });
        }

        let newComment = results[0];

        const incrementCommentsQuery = "UPDATE Post SET num_comments = num_comments + 1 WHERE post_id = ?";
        connection.query(incrementCommentsQuery, [post_id], (error) => {
          if (error) {
            console.error("Error incrementing comment count:", error);
            return connection.rollback(() => {
              res.status(500).json({ error: "Failed to increment comment count" });
            });
          }

          connection.commit((err) => {
            if (err) {
              console.error("Transaction Commit Error:", err);
              return connection.rollback(() => {
                res.status(500).json({ error: "Transaction Commit Error" });
              });
            }
            res.status(201).json(newComment);  // Return the newly added comment with user's full name
          });
        });
      });
    });
  });
});


// delete comment
router.delete("/api/comments/:commentId", (req, res) => {
  const { commentId } = req.params; 
  const deleteCommentQuery = "DELETE FROM `Comment` WHERE comment_id = ?";
  const decrementCommentsQuery = "UPDATE Post SET num_comments = num_comments - 1 WHERE post_id = ?";

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Transaction Begin Error:", err);
      return res.status(500).json({ error: "Transaction Begin Error" });
    }

    connection.query(deleteCommentQuery, [commentId], (error) => {
      if (error) {
        console.error("Error removing comment:", error);
        return connection.rollback(() => {
          res.status(500).json({ error: "Failed to remove comment" });
        });
      }

      const postId = req.body.post_id;

      connection.query(decrementCommentsQuery, [postId], (error) => {
        if (error) {
          console.error("Error decrementing comment count:", error);
          return connection.rollback(() => {
            res.status(500).json({ error: "Failed to decrement comment count" });
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error("Transaction Commit Error:", err);
            return connection.rollback(() => {
              res.status(500).json({ error: "Transaction Commit Error" });
            });
          }
          res.status(200).json({ message: "Comment removed successfully" });
        });
      });
    });
  });
});


// Fetch comments for a post
router.get("/api/comments/:postId", (req, res) => {
  const { postId } = req.params;
  const fetchCommentsQuery = `
    SELECT c.comment_id, c.user_id, c.comment_content, c.comment_time, u.full_name
      FROM Comment AS c
        INNER JOIN User AS u ON c.user_id = u.user_id  -- Ensure the correct use of aliases
          WHERE c.post_id = ?
            ORDER BY c.comment_time DESC
  `;

  connection.query(fetchCommentsQuery, [postId], (error, results) => {
    if (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ error: "Failed to fetch comments" });
    }
    res.status(200).json(results);
  });
});




// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Friend Request
// Send a friend request
router.post("/api/friends/request", (req, res) => {
  const { requester_id, receiver_id } = req.body;

  const checkRequestQuery = `
      SELECT * FROM Friend_Request
      WHERE (requester_id = ? AND receiver_id = ?)
      OR (requester_id = ? AND receiver_id = ?)
  `;

  connection.query(
    checkRequestQuery,
    [requester_id, receiver_id, receiver_id, requester_id],
    (err, results) => {
      if (err) {
        console.error("SQL Error:", err);
        return res
          .status(500)
          .send({ message: "Database error", error: err.message });
      }

      // If a friend request already exists in either direction, do not allow a new one
      if (results.length > 0) {
        return res
          .status(409)
          .send({ message: "Friend request already exists." });
      }

      // If no existing request, proceed to insert a new request
      const insertRequestQuery = `
          INSERT INTO Friend_Request (status, requester_id, receiver_id)
          VALUES ('pending', ?, ?)
      `;

      connection.query(
        insertRequestQuery,
        [requester_id, receiver_id],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("SQL Error on insert:", insertErr);
            return res.status(500).send({
              message: "Failed to create friend request",
              error: insertErr.message,
            });
          }
          res.send({
            message: "Friend request sent!",
            requestId: insertResult.insertId,
          });
        }
      );
    }
  );
});

// Receive a freind request (default: pending) can accepted / declined
// GET /api/friends/requests
// This endpoint retrieves the list of pending friend requests for the current user
router.get("/api/friends/requests", (req, res) => {
  // need receiver id and sender id just like post api/request to navigate the profile
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required." });
  }

  const fetchRequestsQuery = `
      SELECT f.friend_request_id, u.full_name AS sender, f.requester_id AS senderId
      FROM Friend_Request f
      JOIN User u ON f.requester_id = u.user_id
      WHERE f.receiver_id = ? AND f.status = 'pending'
  `;

  connection.query(fetchRequestsQuery, [userId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res
        .status(500)
        .send({ message: "Database error", error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: "No friend requests found." });
    }
    res.json(
      results.map((row) => ({
        id: row.friend_request_id,
        sender: row.sender,
        receiverId: userId,
        senderId: row.senderId, // this one is used for navigating each profile
        accepted: false, // Initial state for all notifications
      }))
    );
  });
});

// Accept a friend request (bi-directional friend_count ++)
router.post("/api/friends/accept/:id", (req, res) => {
  const requestId = req.params.id;

  const acceptRequestQuery = `
      UPDATE Friend_Request
      SET status = 'accepted'
      WHERE friend_request_id = ?
  `;

  connection.query(acceptRequestQuery, [requestId], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).send({ message: "Database error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Friend request not found." });
    }
    res.send({ message: "Friend request accepted." });
  });
});

// Decline a friend request --> just drop / delete from the table
router.delete("/api/friends/decline/:id", (req, res) => {
  const requestId = req.params.id;

  const deleteRequestQuery = `
      DELETE FROM Friend_Request
      WHERE friend_request_id = ?
  `;

  connection.query(deleteRequestQuery, [requestId], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).send({ message: "Database error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Friend request not found." });
    }
    res.send({ message: "Friend request declined." });
  });
});

// Unfriend
router.delete("/api/friends/unfriend", (req, res) => {
  const { requester_id, receiver_id } = req.body;

  const unfriendQuery = `
    DELETE FROM Friend_Request
    WHERE ((requester_id = ? AND receiver_id = ?) OR (requester_id = ? AND receiver_id = ?))
    AND status = 'accepted'
  `;

  connection.query(unfriendQuery, [requester_id, receiver_id, receiver_id, requester_id], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).send({ message: "Database error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Friendship not found." });
    }
    res.send({ message: "Friendship ended." });
  });
});

// Friend List
router.get('/api/friends/list', (req, res) => {
  const profile = req.query.userId; // --> access getCurrentUserId()

  connection.query(`
    SELECT u.user_id, a.username, u.full_name
    FROM User u
    JOIN Friend_Request f ON u.user_id = f.receiver_id OR u.user_id = f.requester_id
    JOIN Account a ON u.user_id = a.user_id
    WHERE (f.receiver_id = ? OR f.requester_id = ?) AND f.status = 'accepted' AND u.user_id != ?
  `, [profile, profile, profile], (error, results) => {
    if (error) {
      console.error('Failed to retrieve friends:', error);
      res.status(500).send({ message: 'Failed to retrieve friends' });
    } else {
      res.json(results);
    }
  });
});



// Usage for friend count via using status == accepted
router.get("/api/isFriend", (req, res) => {
  const { requester_id, receiver_id } = req.query;

  // Ensure both IDs are provided
  if (!requester_id || !receiver_id) {
      return res.status(400).send({ message: "Both requester_id and receiver_id must be provided." });
  }

  const checkFriendshipQuery = `
      SELECT * FROM Friend_Request
      WHERE ((requester_id = ? AND receiver_id = ?) OR (requester_id = ? AND receiver_id = ?))
      AND status = 'accepted'
  `;

  connection.query(checkFriendshipQuery, [requester_id, receiver_id, receiver_id, requester_id], (err, results) => {
      if (err) {
          console.error("SQL Error:", err);
          return res.status(500).send({ message: "Database error", error: err.message });
      }

      const isFriend = results.length > 0;
      res.send({ isFriend });
  });
});*/

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// VENDOR DETAIL
// Insert the data in the Food Vendor from Backend (VendorDetail.js)
router.post("/vendordetail", (req, res) => {
  const { menu_rating, menu_review, vendor_name, menu_name } = req.body;
  const query = `
      INSERT INTO Food_Vendor (menu_rating, menu_review, vendor_name, menu_name)
      VALUES (?, ?, ?, ?)
  `;

  connection.query(
    query,
    [menu_rating, menu_review, vendor_name, menu_name],
    (error, results) => {
      if (error) {
        console.error("Error inserting menu item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({
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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// CREATE EVENT
// Insert the data in the event table from user input
router.post("/creatEvent", (req, res) => {
  const {
    event_description,
    event_type,
    event_name,
    event_location,
    event_host,
    event_time,
    event_creator,
  } = req.body;
  const query = `
    INSERT INTO Event (event_description, event_type, event_name, event_location, event_host, event_time, event_creator)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [event_description, event_type, event_name, event_location, event_host, event_time, event_creator],
    (error, results) => {
      if (error) {
        console.error("Error inserting event:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({
          message: "Event added successfully",
          id: results.insertId,
        });
      }
    }
  );
});

//fetch the event
router.get('/events', (req, res) => {
  const query = 'SELECT * FROM Event';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  


module.exports = router;
