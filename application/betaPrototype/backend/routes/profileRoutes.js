const express = require('express');
const router = express.Router();
router.use(express.json());
const { verifyToken } = require('../middleware/verifyToken');
const profileController = require('./controllers/profileController');

router.post('/api/profile/create', profileController.createProfile);
router.get("/api/user/:user_id", verifyToken, profileController.getProfile);
router.post('/api/profile/edit', verifyToken, profileController.updateProfile);
router.get('/api/profile/info/:userId', verifyToken, profileController.getBasicProfileInfo);

module.exports = router;
