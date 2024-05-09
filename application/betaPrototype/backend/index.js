const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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
app.use(cors()); // set CORS headers FIRST before handers are executed
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use( routesHandler);
app.use(userRoutes);
app.use(postRoutes);
app.use(chatRoutes);
app.use(searchRoutes);
app.use(profileRoutes);
app.use(friend);
app.use(likecomment);
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