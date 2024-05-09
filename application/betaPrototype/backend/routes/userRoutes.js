
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('../routes/db')


const userController = require('./controllers/userController')
const {validateRegister} = require('./controllers/validateRegister')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/reset-password', userController.reset)
module.exports = router;