const mysql = require('mysql');
const connection = require('../db');

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Profile  DETAIL
exports.profile = (req, res) => {
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
      Profile.biography
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
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = results[0];
    const postQuery = 'SELECT * FROM Post WHERE user_id = ?';
    connection.query(postQuery, [user_id], (postError, postResults) => {
      if (postError) {
        console.error('Error fetching user posts:', postError);
        return res.status(500).json({ error: 'Failed to fetch user posts' });
      }

      profile.posts = postResults;
      res.status(200).json(profile);
    });
  });
};
