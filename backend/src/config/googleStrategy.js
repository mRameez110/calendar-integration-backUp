// require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
    accessType: 'offline',
    prompt: 'select_account consent',
    hostedDomain: 'gmail.com',
    scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/calendar.readonly'
    ]
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ isSystemUser: true });

        if (!user) {
            user = new User({
                isSystemUser: true,
                googleAccounts: []  
            });
        }

        
        if (!Array.isArray(user.googleAccounts)) {
            user.googleAccounts = [];
        }
        
        const existingAccount = user.googleAccounts.find(acc => acc.googleId === profile.id);

        if (existingAccount) {
            existingAccount.accessToken = accessToken;
            existingAccount.refreshToken = refreshToken;
        } else {
            user.googleAccounts.push({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                accessToken,
                refreshToken,
                isPrimary: user.googleAccounts.length === 0
            });
        }

        const savedUser = await user.save();
        return done(null, savedUser);
    } catch (error) {
        console.error('Google Strategy Error:', error);
        return done(error, false);
    }
}));


module.exports = passport;