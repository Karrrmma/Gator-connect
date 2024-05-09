const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db')


const postcontrol = require('./controllers/post')

//router.post('/newpost', postcontrol.newposts)
//router.post('/posts', postcontrol.post)


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
// Add New Post



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

module.exports = router;