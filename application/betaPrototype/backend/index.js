const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { verifyToken } = require("./verifyToken");

const routesHandler = require('./routes/handler.js');

const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('../backend/routes/postRoutes.js')
const chatRoutes = require('../backend/routes/chatRoutes.js')
const searchRoutes = require('../backend/routes/searchRoutes.js')
const profileRoutes = require('../backend/routes/profileRoutes.js')


const likecomment = require('../backend/routes/likecommentRoutes.js')
const friend = require('../backend/routes/friendRoutes.js')
require('dotenv/config');

const app = express();
app.use(cors()); // set CORS headers FIRST before handers are executed, this should accept cors requests from all origins
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(routesHandler);
app.use(profileRoutes);
app.use(userRoutes);
// FE suggestion: applies middleware to all routes after this
// takes out the need to manually add verifyToken to each route
// profile and user routes need shouldnt need token verification
// app.use(verifyToken); 
app.use(  postRoutes);
app.use(chatRoutes);
app.use(searchRoutes);
app.use(likecomment);
app.use(friend);

// dummy token
// app.use('/login', (req, res) => {
//     res.send({
//         token: 'test'
//     });
// });

// Backend Server Port
const PORT = 4000;
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}.`);
});