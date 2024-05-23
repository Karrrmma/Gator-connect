/*
  Header:  
  Friend Management Routes for managing friend requests

  Endpoints:
  - POST /api/friends/request: Send a friend request
  - GET /api/friends/requests: Retrieve pending friend requests for the current user
  - POST /api/friends/accept/:id: Accept a friend request
  - DELETE /api/friends/decline/:id: Decline a friend request
  - DELETE /api/friends/unfriend: Unfriend a user
  - GET /api/friends/list: Retrieve the list of friends for a user
  - GET /api/isFriend: Check if two users are friends
*/

const express = require('express');
const router = express.Router();
router.use(express.json());

const { verifyToken } = require('../middleware/verifyToken');

const friendController = require('./controllers/friendController');

// apply middleware throughout the file
router.use(verifyToken);

router.post('/api/friends/request', friendController.sendFriendRequest);
router.get('/api/friends/requests', friendController.getFriendRequests);
router.post('/api/friends/accept/:id', friendController.acceptFriendRequest);
router.delete('/api/friends/decline/:id', friendController.declineFriendRequest);
router.delete('/api/friends/unfriend', friendController.unfriendUser);
router.get('/api/friends/list', friendController.getFriendList);
router.get('/api/isFriend', friendController.isFriend);

module.exports = router;
