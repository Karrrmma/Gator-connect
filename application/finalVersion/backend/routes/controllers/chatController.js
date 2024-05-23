const connection = require('../../config/db');

//------Send Public Message----//
exports.sendPublicMessage = (req, res) => {
  const { sender_id, message_content, message_type } = req.body;
  const date = new Date();

  const insertMessageInformation = `INSERT INTO Public_Message (message_time, message_content, message_type, sender_id) VALUES (?, ?, ?, ?)`;

  connection.query(
    insertMessageInformation,
    [date, message_content, message_type, sender_id],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error('SQL Error on insert:', insertErr);
        return res.status(500).send({
          message: 'Failed to send public Message',
          error: insertErr.message,
        });
      }
      res.send({
        message: 'Public Message sent!',
        //        requestId: insertResult.insertId,
      });
    }
  );
};

//------Fetch public Messages----//
exports.getPublicMessages = (req, res) => {
  const { message_type } = req.params;
  const getPublicMessages = `SELECT * FROM Public_Message WHERE message_type = ?`;

  connection.query(getPublicMessages, [message_type], async (err, results) => {
    if (err) {
      console.error('Error fetching public Messages from DB: ', err);
      return res.status(500).json({ error: 'Failed to fetch public Messages' });
    }

    //format Date
    const results_formatted = results.map((item) => {
      const formattedDate = item.message_time.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      return { ...item, message_time: formattedDate };
    });

    res.status(200).json(results_formatted);
  });
};

//------put private Message to DB----//
exports.sendPrivateMessage = (req, res) => {
  const { sender_id, message_content, receiver_name } = req.body;
  const date = new Date();

  // get user_id from receiver name
  const getUserIDFromReceiver = `SELECT User.user_id FROM User WHERE full_name = ?`;
  connection.query(
    getUserIDFromReceiver,
    [receiver_name],
    async (err, results) => {
      if (err) {
        console.error('Error fetching user_id by receiverName from DB: ', err);
        return res
          .status(500)
          .json({ error: 'Failed to fetch user_id by receiverName' });
      }
      const receiver_id = results[0].user_id;

      // insert private message to DB
      const insertMessageInformation = `INSERT INTO Private_Message (message_time, message_content, sender_id, receiver_id) VALUES (?, ?, ?, ?)`;
      connection.query(
        insertMessageInformation,
        [date, message_content, sender_id, receiver_id],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('SQL Error on insert Private Message:', insertErr);
            return res.status(500).send({
              message: 'Failed to send Private Message',
              error: insertErr.message,
            });
          }

          res.send({
            message: 'Private Message sent!',
            requestId: insertResult.insertId,
          });
        }
      );
      // end

      res.status(200);
    }
  );
  //end
};

//------Fetch private Messages----//
exports.getPrivateMessages = (req, res) => {
  const sender_id = req.query.senderID;
  const receiver_name = req.query.name;

  // fetch user_id from receiver_name
  const getUserIDFromReceiver = `SELECT User.user_id FROM User WHERE full_name = ?`;
  connection.query(
    getUserIDFromReceiver,
    [receiver_name],
    async (err, results) => {
      if (err) {
        console.error('Error fetching user_id by receiverName from DB: ', err);
        return res
          .status(500)
          .json({ error: 'Failed to fetch user_id by receiverName' });
      }
      const receiver_id = results[0].user_id;

      // fetch private messages
      const getPrivateMessages = `SELECT * FROM Private_Message WHERE (sender_id = ? AND receiver_id = ?) OR 
                                               (sender_id = ? AND receiver_id = ?) ORDER BY message_id ASC`;

      connection.query(
        getPrivateMessages,
        [receiver_id, sender_id, sender_id, receiver_id],
        async (err, results) => {
          if (err) {
            console.error('Error fetching private Messages from DB: ', err);
            return res
              .status(500)
              .json({ error: 'Failed to fetch private Messages' });
          }

          //format Date
          const results_formatted = results.map((item) => {
            const formattedDate = item.message_time.toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }
            );
            return { ...item, message_time: formattedDate };
          });

          res.status(200).json(results_formatted);
        }
      );
    }
  );
};

//------Fetch private Chats----//
exports.getPrivateChats = (req, res) => {
  const { receiver_id } = req.params;
  const getPrivateChats = `SELECT DISTINCT sender_id FROM Private_Message WHERE (receiver_id = ?)`;

  connection.query(getPrivateChats, [receiver_id], async (err, results) => {
    if (err) {
      console.error('Error fetching private Chats from DB: ', err);
      return res.status(500).json({ error: 'Failed to fetch private Chats' });
    }

    res.status(200).json(results);
  });
};

//------Fetch private Chats where receiver hasn't texted back yet----//
exports.getPrivateChatsNoAnswer = (req, res) => {
  const { receiver_id } = req.params;
  const getPrivateChats = `SELECT DISTINCT receiver_id FROM Private_Message WHERE (sender_id = ? AND 
    receiver_id NOT IN (SELECT sender_id FROM Private_Message))`;

  connection.query(
    getPrivateChats,
    [receiver_id, receiver_id],
    async (err, results) => {
      if (err) {
        console.error(
          'Error fetching private Chats with no answer from DB: ',
          err
        );
        return res
          .status(500)
          .json({ error: 'Failed to fetch private Chats with no answer' });
      }

      res.status(200).json(results);
    }
  );
};
