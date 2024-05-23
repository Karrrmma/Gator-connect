const express = require('express');
const router = express.Router();
router.use(express.json());

const likeCommentController = require('./controllers/likeCommentController');

router.post('/api/likes', likeCommentController.addLike);
router.delete('/api/likes', likeCommentController.removeLike);

router.get('/api/likes/:userId', likeCommentController.getLikedPosts);
router.get('/api/likes/isLiked/:userId/:postId', likeCommentController.isPostLiked);

router.post('/api/comments', likeCommentController.addComment);
router.delete('/api/comments/:commentId', likeCommentController.removeComment);
router.get('/api/comments/:postId', likeCommentController.getComments);

module.exports = router;
