const express = require("express")
const dbConnection = require("../database");

//post Food
const createFood = async (req,res)=>{

    try{ 
        const { foods_types, name, price } = req.body;
        const newFood = [
            foods_types,
            name,
            price,
        ];

       await dbConnection.query(
            'INSERT INTO foods ( foods_types,name,price) VALUES (?, ?, ?)',
            newFood,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

//update Food
 const updateFood = async (req,res)=>{

    try{ 
        const { foods_types, name, price } = req.body;
        const newFood = [
            foods_types,
            name,
            price,
            req.params.id
        ];

       await dbConnection.query(
            'UPDATE foods SET foods_types = ? , name = ? , price = ? WHERE id = ?',
            newFood,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //delete Food
 const deleteFood = async (req,res)=>{

    try{ 
        const newFood = [
            req.params.id
        ];

       await dbConnection.query(
            'DELETE FROM foods WHERE id=?',
            newFood,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //get Food
 const getFood = async (req,res)=>{

    try{ 
        const getFoods=await dbConnection.query('SELECT * FROM foods')
        res.send(getFoods[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }

 //get by ID_Food
 const getByIdFood = async (req,res)=>{
    try{ 
        
        const getFoods=await dbConnection.query('SELECT * FROM foods WHERE id=?',[req.params.id])
        res.send(getFoods[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }
 
 module.exports = { createFood,getFood,deleteFood,updateFood,getByIdFood };