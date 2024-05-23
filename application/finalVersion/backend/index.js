const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

// Import routes
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const likeCommentRoutes = require('./routes/likeCommentRoutes.js');
const friendRoutes = require('./routes/friendRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const vendorRoutes = require('./routes/vendorRoutes.js');

// Init express app
const app = express();

// Use middleware
app.use(cors()); // set CORS headers FIRST before handers are executed, this should accept cors requests from all origins
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use(profileRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(chatRoutes);
app.use(searchRoutes);
app.use(likeCommentRoutes);
app.use(friendRoutes);
app.use(eventRoutes);
app.use(vendorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.tokenExpired) {
    // Handle token expired error
    res.status(err.status).send({ message: err.message, tokenExpired: true });
  } else {
    // Handle other errors
    res.status(err.status || 500).send({ message: err.message });
  }
});

// Backend Server Port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
