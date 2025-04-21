const passport = require('passport');
const { googleAuthService } = require('../services/googleAuthService');
const { InvalidCredentialError } = require('../utils/errorClass');

const googleAuth = (req, res, next) => {
   passport.authenticate('google', {
      scope: [
         'profile',
         'email',
         'https://www.googleapis.com/auth/calendar.readonly'
      ],
      accessType: 'offline',
      prompt: 'consent'
   })(req, res, next);
};

const googleCallback = (req, res, next) => {
   passport.authenticate('google', { failureRedirect: '/login' }, async (err, user) => {
      if (err || !user) {
         return next(new InvalidCredentialError("Google authentication failed", 401));
      }

      try {
         const redirectUrl = await googleAuthService(user);
         res.redirect(redirectUrl);
      } catch (error) {
         next(error);
      }
   })(req, res, next);
};

module.exports = { googleAuth, googleCallback };
