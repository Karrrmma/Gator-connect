// Server-side Register validation

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('../db')

exports.validateRegister = (req, res, next) =>{
    const { fullname, sfsu_email, username, password, major, year } = req.body;
    if (!fullname || !sfsu_email || !username || !password || !major) {
      return res.status(400).json({ error: "Missing fields" });
    }
  
    if (!/^[\w-]+(\.[\w-]+)*@sfsu.edu$/.test(sfsu_email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
  
    if (password.length < 8 || !/\d/.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and contain a number",
      });
    }
  
    next();
}

