const express = require('express');
const router = express.Router();
router.use(express.json());

const postController = require('./controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');

router.use(verifyToken);

router.post('/api/post/new', postController.createNewPost);
router.get('/api/posts', postController.getAllPosts);

module.exports = router;
