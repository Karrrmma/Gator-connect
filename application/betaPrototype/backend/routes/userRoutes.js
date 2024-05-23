const express = require('express');
const router = express.Router();
router.use(express.json());

const userController = require('./controllers/userController');
const { validateRegister } = require('../middleware/validateRegister');

router.post('/api/register', validateRegister, userController.register);
router.post('/api/canRegister', userController.canRegister);
router.post('/api/login', userController.login);
router.post('/api/resetPassword', userController.reset);

module.exports = router;
