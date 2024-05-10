
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('../db')
require('dotenv/config');


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Register @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
// Register query for sign up form
exports.register = (req, res) => {
    const { fullname, sfsu_email, username, password, major, year, role } =
      req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
  
    const userQuery = "INSERT INTO User (full_name, sfsu_email) VALUES (?, ?)";
    const accountQuery =
      "INSERT INTO Account(username, password, created_time, user_id) VALUES(?, ?, DATE_SUB(NOW(), INTERVAL 7 HOUR), ?)";
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
  };
  
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Login @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
  // log in user query
  exports.login =  (req, res) => {
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
          process.env.JWT,
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
  };

  // Reset Password
exports.reset = (req, res) => {
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
};