const express = require("express")
const dbConnection = require("../database");
const router = express.Router()

// router.get("/",async function(req,res,next){
//     try{
//         re
//     }
// })



let drinks = dbConnection.drinks

