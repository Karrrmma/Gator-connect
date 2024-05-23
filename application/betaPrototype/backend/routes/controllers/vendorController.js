const connection = require('../../config/db');

// VENDOR DETAIL
// Insert the data in the Food Vendor from Backend (VendorDetail.js)
exports.addVendorDetail = (req, res) => {
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
};

exports.getVendorDetail = (req, res) => {
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
};

// FoodVendor Average Rating
exports.getVendorAverageRatings = (req, res) => {
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
};
