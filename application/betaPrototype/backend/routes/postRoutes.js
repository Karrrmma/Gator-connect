const express = require('express');
const router = express.Router();
router.use(express.json());

const postController = require('./controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/api/post/new', verifyToken, postController.createNewPost);
router.get('/api/posts', verifyToken, postController.getAllPosts);

module.exports = router;
