const express = require('express');
const router = express.Router();
const { googleAuth, googleCallback } = require('../controllers/googleAuthController');

router.get('/', googleAuth);
router.get('/callback', googleCallback);

module.exports = router;
