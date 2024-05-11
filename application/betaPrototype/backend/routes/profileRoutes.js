const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db')


const profileControl = require('./controllers/profile')

//router.post("/api/user/:user_id", profileControl.profile)

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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Profile DB Creation

router.post('/api/createprofile', (req, res) => {
  const { username, avatar, biography } = req.body;

  const queryAccountId = `
      SELECT account_id FROM Account WHERE username = ?
  `;

  connection.query(queryAccountId, [username], (error, results) => {
      if (error) {
          console.error("Error fetching account_id:", error);
          return res.status(500).json({ error: "Failed to fetch account_id" });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: "Username not found" });
      }

      const userId = results[0].account_id;

      const queryInsertProfile = `
          INSERT INTO Profile (account_id, avatar, biography)
          VALUES (?, ?, ?)
      `;

      connection.query(queryInsertProfile, [userId, avatar, biography], (error, results) => {
          if (error) {
              console.error("Error creating profile:", error);
              return res.status(500).json({ error: "Failed to create profile" });
          }

          res.status(200).json({ message: "Profile created successfully" });
      });
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Profile DB Update

router.post('/api/updateprofile', (req, res) => {
    const { userId, avatar, biography } = req.body;

    const query = `
        UPDATE Profile
        SET avatar = ?, biography = ?
        WHERE account_id = ?
    `;

    connection.query(query, [avatar, biography, userId], (error, results) => {
        if (error) {
            console.error("Error updating profile:", error);
            return res.status(500).json({ error: "Failed to update profile" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "No profile found for id, account was created before changes" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    });
  }
);



module.exports = router;