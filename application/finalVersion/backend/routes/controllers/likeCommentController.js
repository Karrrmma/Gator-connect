const connection = require('../../config/db');

// Like
// Add a like to the database and increment the num_likes in Post table
exports.addLike = (req, res) => {
  const { user_id, post_id } = req.body;
  const insertLikeQuery = 'INSERT INTO `Like` (user_id, post_id) VALUES (?, ?)';
  const incrementLikesQuery =
    'UPDATE Post SET num_likes = num_likes + 1 WHERE post_id = ?';

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Transaction Begin Error:', err);
      return res.status(500).json({ error: 'Transaction Begin Error' });
    }

    connection.query(insertLikeQuery, [user_id, post_id], (error, results) => {
      if (error) {
        console.error('Error adding like:', error);
        return connection.rollback(() => {
          res.status(500).json({ error: 'Failed to add like' });
        });
      }

      connection.query(incrementLikesQuery, [post_id], (error) => {
        if (error) {
          console.error('Error incrementing like count:', error);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Failed to increment like count' });
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error('Transaction Commit Error:', err);
            return connection.rollback(() => {
              res.status(500).json({ error: 'Transaction Commit Error' });
            });
          }
          res.status(201).json({ message: 'Like added successfully' });
        });
      });
    });
  });
};

// Remove a like from the database and decrement the num_likes in Post table
exports.removeLike = (req, res) => {
  const { user_id, post_id } = req.body;
  const deleteLikeQuery =
    'DELETE FROM `Like` WHERE user_id = ? AND post_id = ?';
  const decrementLikesQuery =
    'UPDATE Post SET num_likes = num_likes - 1 WHERE post_id = ? AND num_likes > 0';

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Transaction Begin Error:', err);
      return res.status(500).json({ error: 'Transaction Begin Error' });
    }

    connection.query(deleteLikeQuery, [user_id, post_id], (error) => {
      if (error) {
        console.error('Error removing like:', error);
        return connection.rollback(() => {
          res.status(500).json({ error: 'Failed to remove like' });
        });
      }

      connection.query(decrementLikesQuery, [post_id], (error) => {
        if (error) {
          console.error('Error decrementing like count:', error);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Failed to decrement like count' });
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error('Transaction Commit Error:', err);
            return connection.rollback(() => {
              res.status(500).json({ error: 'Transaction Commit Error' });
            });
          }
          res.status(200).json({ message: 'Like removed successfully' });
        });
      });
    });
  });
};

// get all liked posts by a user
exports.getLikedPosts = (req, res) => {
  const { userId } = req.params;
  const fetchLikedPostsQuery = `
      SELECT p.post_id, p.post_content, p.post_time, p.num_likes, p.num_comments, u.full_name, p.user_id, pr.avatar
      FROM Post AS p
      INNER JOIN \`Like\` AS l ON p.post_id = l.post_id
      INNER JOIN User AS u ON p.user_id = u.user_id
      INNER JOIN Account AS a ON u.user_id = a.user_id
      INNER JOIN Profile AS pr ON a.account_id = pr.account_id
      WHERE l.user_id = ?
      ORDER BY p.post_time DESC
    `;

  connection.query(fetchLikedPostsQuery, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching liked posts:', error);
      return res.status(500).json({ error: 'Failed to fetch liked posts' });
    }

    const likedPostList = results.map((post) => ({
      post_id: post.post_id,
      liked: true,
    }));

    res.status(200).json(likedPostList);
  });
};

// return if a post is liked by a user
exports.isPostLiked = (req, res) => {
  const { userId, postId } = req.params;
  const fetchLikedPostsQuery = `
    SELECT p.post_id, p.post_content, p.post_time, p.num_likes, p.num_comments, u.full_name, p.user_id, pr.avatar
    FROM Post AS p
    INNER JOIN \`Like\` AS l ON p.post_id = l.post_id
    INNER JOIN User AS u ON p.user_id = u.user_id
    INNER JOIN Account AS a ON u.user_id = a.user_id
    INNER JOIN Profile AS pr ON a.account_id = pr.account_id
    WHERE l.user_id = ? AND l.post_id = ?
    ORDER BY p.post_time DESC
  `;
  connection.query(fetchLikedPostsQuery, [userId, postId], (error, results) => {
    if (error) {
      console.error('Error fetching liked posts:', error);
      return res.status(500).json({ error: 'Failed to fetch liked posts' });
    }
    res.status(200).json({ isLiked: results.length > 0 });
  });
};

// Add a comment
exports.addComment = (req, res) => {
  const { user_id, post_id, comment_content } = req.body;
  const insertCommentQuery =
    'INSERT INTO `Comment` (user_id, post_id, comment_content, comment_time) VALUES (?, ?, ?, DATE_SUB(NOW(), INTERVAL 7 HOUR))';

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Transaction Begin Error:', err);
      return res.status(500).json({ error: 'Transaction Begin Error' });
    }

    connection.query(
      insertCommentQuery,
      [user_id, post_id, comment_content],
      (error, results) => {
        if (error) {
          console.error('Error adding comment:', error);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Failed to add comment' });
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
              res
                .status(500)
                .json({ error: 'Failed to fetch last inserted comment' });
            });
          }

          let newComment = results[0];

          const incrementCommentsQuery =
            'UPDATE Post SET num_comments = num_comments + 1 WHERE post_id = ?';
          connection.query(incrementCommentsQuery, [post_id], (error) => {
            if (error) {
              console.error('Error incrementing comment count:', error);
              return connection.rollback(() => {
                res
                  .status(500)
                  .json({ error: 'Failed to increment comment count' });
              });
            }

            connection.commit((err) => {
              if (err) {
                console.error('Transaction Commit Error:', err);
                return connection.rollback(() => {
                  res.status(500).json({ error: 'Transaction Commit Error' });
                });
              }
              res.status(201).json(newComment); // Return the newly added comment with user's full name
            });
          });
        });
      }
    );
  });
};

// Delete a comment
exports.removeComment = (req, res) => {
  const { commentId } = req.params;
  const deleteCommentQuery = 'DELETE FROM `Comment` WHERE comment_id = ?';
  const decrementCommentsQuery =
    'UPDATE Post SET num_comments = num_comments - 1 WHERE post_id = ?';

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Transaction Begin Error:', err);
      return res.status(500).json({ error: 'Transaction Begin Error' });
    }

    connection.query(deleteCommentQuery, [commentId], (error) => {
      if (error) {
        console.error('Error removing comment:', error);
        return connection.rollback(() => {
          res.status(500).json({ error: 'Failed to remove comment' });
        });
      }

      const postId = req.body.post_id;

      connection.query(decrementCommentsQuery, [postId], (error) => {
        if (error) {
          console.error('Error decrementing comment count:', error);
          return connection.rollback(() => {
            res
              .status(500)
              .json({ error: 'Failed to decrement comment count' });
          });
        }

        connection.commit((err) => {
          if (err) {
            console.error('Transaction Commit Error:', err);
            return connection.rollback(() => {
              res.status(500).json({ error: 'Transaction Commit Error' });
            });
          }
          res.status(200).json({ message: 'Comment removed successfully' });
        });
      });
    });
  });
};

// Fetch comments for a post
exports.getComments = (req, res) => {
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
      console.error('Error fetching comments:', error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
    res.status(200).json(results);
  });
};
