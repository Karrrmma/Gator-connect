
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db');

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
  router.delete("/api/likes",(req, res) => {
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
  router.get("/api/comments/:postId",(req, res) => {
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

  
  module.exports = router;