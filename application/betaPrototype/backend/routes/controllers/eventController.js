const connection = require('../../config/db');

// CREATE EVENT
// Insert the data in the event table from user input
exports.createEvent = (req, res) => {
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
};

//fetch the event
exports.getEvents = (req, res) => {
  const query = 'SELECT * FROM Event';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};
