const express = require('express');
const router = express.Router();
router.use(express.json());
const connection = require('../config/db');

const { verifyToken } = require('../middleware/verifyToken');
const chatController = require('./controllers/chatController');

// apply middleware to all routes
router.use(verifyToken);

router.post('/api/chat/sendPublicMessage', chatController.sendPublicMessage);
router.get('/api/chat/getPublicMessages/:message_type', chatController.getPublicMessages);
router.post('/api/chat/sendPrivateMessage', chatController.sendPrivateMessage);
router.get('/api/chat/getPrivateMessages', chatController.getPrivateMessages);
router.get('/api/chat/getPrivateChats/:receiver_id', chatController.getPrivateChats);
router.get('/api/chat/getPrivateChats/noAnswer/:receiver_id', chatController.getPrivateChatsNoAnswer);

module.exports = router;
