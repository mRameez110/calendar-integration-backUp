const { google } = require('googleapis');
const { BadRequestError, NotFoundError } = require('../utils/errorClass');


const getEventsService = async (user, date) => {
   if (!date || isNaN(new Date(date).getTime())) {
      throw new BadRequestError("Invalid date format. Use YYYY-MM-DD");
   }

   const targetDate = new Date(date);
   const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)).toISOString();
   const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)).toISOString();

   if (!user.googleAccounts || user.googleAccounts.length === 0) {
      throw new NotFoundError("No Google accounts connected");
   }

   const events = [];
   const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
   );

   for (const account of user.googleAccounts) {
      try {
         oauth2Client.setCredentials({
            access_token: account.accessToken,
            refresh_token: account.refreshToken
         });

         const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
         const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: startOfDay,
            timeMax: endOfDay,
            singleEvents: true,
            orderBy: 'startTime'
         });

         const items = response.data.items || [];

         for (const event of items) {
            event.accountEmail = account.email;
            events.push(event);
         }

      } catch (accountError) {
         console.error(`Error fetching events for ${account.email}:`, accountError.message);
         continue;
      }
   }

   return events;
};

module.exports = { getEventsService };
