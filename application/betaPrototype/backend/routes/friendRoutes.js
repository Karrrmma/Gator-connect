/*
  Header:  
  Friend Management Routes for managing friend requests

  Endpoints:
  - POST /api/friends/request: Send a friend request
  - GET /api/friends/requests: Retrieve pending friend requests for the current user
  - POST /api/friends/accept/:id: Accept a friend request
  - DELETE /api/friends/decline/:id: Decline a friend request
  - DELETE /api/friends/unfriend: Unfriend a user
  - GET /api/friends/list: Retrieve the list of friends for a user
  - GET /api/isFriend: Check if two users are friends
*/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db')

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
router.get('/api/friends/list',(req, res) => {
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
});
module.exports = router;