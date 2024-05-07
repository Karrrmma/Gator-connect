const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
require('dotenv/config');

const app = express();
app.use(cors()); // set CORS headers FIRST before handers are executed
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routesHandler);


// Backend Server Port
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});