const express = require('express');
const router = express.Router();
const timestamp_controller = require('../controllers/timestamp');

router.get('/api/timestamp/:date_string', timestamp_controller.timestamp);

module.exports = router;

