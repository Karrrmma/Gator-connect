const connection = require('../../config/db');

// Get Profile Details
exports.getProfile = (req, res) => {
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

// Profile DB Creation

exports.createProfile = (req, res) => {
  const { username, avatar, biography } = req.body;

  const queryAccountId = `
        SELECT account_id FROM Account WHERE username = ?
    `;

  connection.query(queryAccountId, [username], (error, results) => {
    if (error) {
      console.error('Error fetching account_id:', error);
      return res.status(500).json({ error: 'Failed to fetch account_id' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Username not found' });
    }

    const userId = results[0].account_id;

    const queryInsertProfile = `
            INSERT INTO Profile (account_id, avatar, biography)
            VALUES (?, ?, ?)
        `;

    connection.query(
      queryInsertProfile,
      [userId, avatar, biography],
      (error, results) => {
        if (error) {
          console.error('Error creating profile:', error);
          return res.status(500).json({ error: 'Failed to create profile' });
        }

        res.status(200).json({ message: 'Profile created successfully' });
      }
    );
  });
};

// Profile DB Update

exports.updateProfile = (req, res) => {
  const { account_id: user_id, biography } = req.body;

  const accountIdQuery = 'SELECT account_id FROM Account WHERE user_id = ?';

  connection.query(accountIdQuery, [user_id], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).send({ error: 'User not found' });
    }

    const account_id = results[0].account_id;

    const profileQuery =
      'UPDATE Profile SET biography = ? WHERE account_id = ?';

    connection.query(
      profileQuery,
      [biography, account_id],
      (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).send({ error: 'Internal server error' });
        }

        if (results.affectedRows === 0) {
          return res.status(404).send({ error: 'Account not found' });
        }

        res.send({ message: 'Profile updated successfully' });
      }
    );
  });
};

// Profile Avatar and Biography Retrieval
exports.getBasicProfileInfo = (req, res) => {
  const { userId } = req.params;
  // seems like user_id != account_id
  // find the user_id thats linked to a profile
  const query = `
        SELECT Profile.avatar, Profile.biography
        FROM User
        JOIN Account ON User.user_id = Account.user_id
        JOIN Profile ON Account.account_id = Profile.account_id
        WHERE User.user_id = ?
    `;
  // console.log(userId);
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching profile info:', error);
      return res.status(500).json({ error: 'Failed to fetch profile info' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(results[0]);
  });
};
