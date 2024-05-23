const express = require('express');
const router = express.Router();
router.use(express.json());

const { verifyToken } = require('../middleware/verifyToken');
const eventController = require('./controllers/eventController');

// apply middleware to all routes
router.use(verifyToken);

router.post('/api/createEvent', eventController.createEvent);
router.get('/api/events', eventController.getEvents);

module.exports = router;