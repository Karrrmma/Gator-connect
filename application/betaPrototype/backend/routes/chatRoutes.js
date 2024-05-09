const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
router.use(express.json());
const connection = require('./db')


const chat = require('./controllers/chat')

//router.post("/api/chat/sendPublicMessage", chat.publicchat)
//router.post("/api/chat/getPublicMessages/:message_type", chat.privatechat)
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
// @@@@@ CHAT

//------put public Message to DB----//
router.post("/api/chat/sendPublicMessage", (req, res) => {
    const { sender_id, message_content, message_type } = req.body;
    const date = new Date();
  
  
    const insertMessageInformation = `INSERT INTO Message (message_time, message_content, message_type, sender_id) VALUES (?, ?, ?, ?)`;
  
    connection.query(insertMessageInformation,[date, message_content, message_type, sender_id],(insertErr, insertResult) => {
        if (insertErr) {
          console.error("SQL Error on insert:", insertErr);
          return res.status(500).send({
            message: "Failed to send public Message",
            error: insertErr.message,
          });
        }
        res.send({
          message: "Public Message sent!",
  //        requestId: insertResult.insertId,
        });
      }
    );
  });
  
  
  
  //------Fetch public Messages----//
  router.get("/api/chat/getPublicMessages/:message_type", (req, res) => {
    const {message_type} = req.params;
    const getPublicMessages = `SELECT * FROM Message WHERE message_type = ?`;
  
    connection.query(getPublicMessages, [message_type], async(err, results) => {
      if(err){
        console.error('Error fetching public Messages from DB: ', err);
        return res.status(500).json({ error: "Failed to fetch public Messages" });
      }
      
      //format Date
      const results_formatted = results.map(item => {
        const formattedDate = (item.message_time).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        return {...item, message_time: formattedDate}
      })
  
      res.status(200).json(results_formatted);
    })
  })


module.exports = router;