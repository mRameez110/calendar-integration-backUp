const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { getEvents } = require('../controllers/eventController');

router.get('/', requireAuth, getEvents);

module.exports = router;
