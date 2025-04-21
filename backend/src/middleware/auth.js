const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { BadRequestError } = require("../utils/errorClass");

const requireAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new BadRequestError("Access Denied, Token not found", 400);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId, isSystemUser: true });
        console.log('chek 1 in auth.js midleware', user)

        if (!user) {

            throw new BadRequestError("Access Denied, Token not found", 400);
        }


        const validAccounts = Array.isArray(user.googleAccounts) ?
            user.googleAccounts.filter(acc => acc.accessToken) : [];

        if (validAccounts.length === 0) {
            return res.status(401).json({ error: 'No Authenticated accounts' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        next(error)
    }
};

module.exports = requireAuth;
