const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const authRoute = require('./routes/AuthRoutes');

const app = express();
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.json({message:'ok'})
})
app.use('/auth',authRoute)

// APPLY COOKIE SESSION MIDDLEWARE
// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     maxAge:  3600 * 1000 // 1hr
// }));



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });



app.listen(3000, () => console.log("Server is Running..."));