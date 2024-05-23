const express = require('express');
const router = express.Router();
router.use(express.json());

const searchController = require('./controllers/searchController');

router.post('/api/search', searchController.search)

module.exports = router;
