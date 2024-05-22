const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

// Import routes
const routesHandler = require('./routes/handler.js');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('../backend/routes/postRoutes.js');
const chatRoutes = require('../backend/routes/chatRoutes.js');
const searchRoutes = require('../backend/routes/searchRoutes.js');
const profileRoutes = require('../backend/routes/profileRoutes.js');
const likeComment = require('./routes/likeCommentRoutes.js');
const friend = require('../backend/routes/friendRoutes.js');

// Init express app
const app = express();

// Use middleware
app.use(cors()); // set CORS headers FIRST before handers are executed, this should accept cors requests from all origins
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use(routesHandler);
app.use(profileRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(chatRoutes);
app.use(searchRoutes);
app.use(likeComment);
app.use(friend);

// Backend Server Port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
