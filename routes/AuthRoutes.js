const authRoute = require('express').Router()
const authController =require('../controllers/AuthControllers')

authRoute.post('/register',authController.register)
// authRoute.get('/register',authController.register)

module.exports = authRoute