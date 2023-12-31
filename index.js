const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const authRoute = require('./routes/AuthRoutes');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/AdminRoutes');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});
app.use('/auth', authRoute);
app.use('/admin', adminRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(3000, () => console.log("Server is Running..."));
