require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
require('./config/googleStrategy');
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(passport.initialize());


app.use('/auth/google', require('./routes/googleAuth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));


app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not exist' });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
