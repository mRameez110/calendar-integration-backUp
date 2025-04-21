const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { getUserAccounts, removeUserAccount } = require('../controllers/userController');

router.get('/accounts', requireAuth, getUserAccounts);
router.delete('/accounts/:accountId', requireAuth, removeUserAccount);

module.exports = router;
