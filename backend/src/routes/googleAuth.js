const express = require('express');
const router = express.Router();
const { googleAuth, googleCallback } = require('../controllers/googleAuthController');

router.get('/', googleAuth);
router.get('/callback', (req, res, next) => {
   console.log("✅ Callback route hit");
   next();
}, googleCallback);

// router.get('/callback', googleCallback);

module.exports = router;
