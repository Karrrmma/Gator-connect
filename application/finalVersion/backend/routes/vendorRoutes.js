const express = require('express');
const router = express.Router();
router.use(express.json());

const { verifyToken } = require('../middleware/verifyToken');
const vendorController = require('./controllers/vendorController');

// apply middleware to all routes
router.use(verifyToken);

router.post('/api/vendordetail', vendorController.addVendorDetail);
router.get('/api/vendordetail/:vendor_name', vendorController.getVendorDetail);
router.get('/api/vendorAverageRatings', vendorController.getVendorAverageRatings);

module.exports = router;