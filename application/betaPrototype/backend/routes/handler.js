const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
router.use(express.json());

// @@@ Need to install CORS if we have our database in a diff link @@@
const { verifyToken } = require('../middleware/verifyToken.js');

// Connect Database
const connection = mysql.createConnection({
  host: 'gatorconnect.cfwym6mqiofo.us-west-1.rds.amazonaws.com',
  user: 'thream',
  password: 'Jose*ortiz3',
  database: 'mydb',
});

// Debugging Connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// VENDOR DETAIL
// Insert the data in the Food Vendor from Backend (VendorDetail.js)
router.post('/api/vendordetail', (req, res) => {
  const { menu_rating, menu_review, vendor_name, menu_name } = req.body;
  const query = `
      INSERT INTO Food_Vendor (menu_rating, menu_review, vendor_name, menu_name)
      VALUES (?, ?, ?, ?)
  `;

  connection.query(
    query,
    [menu_rating, menu_review, vendor_name, menu_name],
    (error, results) => {
      if (error) {
        console.error('Error inserting menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({
          message: 'Menu item added successfully',
          id: results.insertId,
        });
      }
    }
  );
});

router.get('/api/vendordetail/:vendor_name', (req, res) => {
  const { vendor_name } = req.params;

  const query = `
    SELECT menu_name, menu_rating, menu_review
    FROM Food_Vendor
    WHERE vendor_name = ?
  `;

  connection.query(query, [vendor_name], (error, results) => {
    if (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res
          .status(404)
          .json({ message: 'No menu items found for this vendor.' });
      }
    }
  });
});

// FoodVendor Average Rating
router.get('/api/vendorAverageRatings', (req, res) => {
  const query = `
    SELECT vendor_name, AVG(menu_rating) as average_rating, COUNT(menu_rating) as num_reviews
    FROM Food_Vendor
    GROUP BY vendor_name
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching average ratings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CREATE EVENT
// Insert the data in the event table from user input
router.post('/api/createEvent', (req, res) => {
  const {
    event_description,
    event_type,
    event_name,
    event_location,
    event_host,
    event_time,
    event_creator,
  } = req.body;
  const query = `
    INSERT INTO Event (event_description, event_type, event_name, event_location, event_host, event_time, event_creator)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      event_description,
      event_type,
      event_name,
      event_location,
      event_host,
      event_time,
      event_creator,
    ],
    (error, results) => {
      if (error) {
        console.error('Error inserting event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({
          message: 'New event created! Refresh page to see it displayed.',
          id: results.insertId,
        });
      }
    }
  );
});

//fetch the event
router.get('/api/events', (req, res) => {
  const query = 'SELECT * FROM Event';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

module.exports = router;
