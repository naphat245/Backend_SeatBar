const express = require("express")
const dbConnection = require("../database");


//post Drink
const createDrink = async (req,res)=>{

    try{ 
        const { drinks_types, name, price } = req.body;
        const newDrink = [
            drinks_types,
            name,
            price,
        ];

       await dbConnection.query(
            'INSERT INTO drinks ( drinks_types,name,price) VALUES (?, ?, ?)',
            newDrink,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

//update Drink
 const updateDrink = async (req,res)=>{

    try{ 
        const { drinks_types, name, price } = req.body;
        const newDrink = [
            drinks_types,
            name,
            price,
            req.params.id
        ];

       await dbConnection.query(
            'UPDATE drinks SET drinks_types = ? , name = ? , price = ? WHERE id = ?',
            newDrink,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //delete Drink
 const deleteDrink = async (req,res)=>{

    try{ 
        const newDrink = [
            req.params.id
        ];

       await dbConnection.query(
            'DELETE FROM drinks WHERE id=?',
            newDrink,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //get Drink
 const getDrink = async (req,res)=>{

    try{ 
        const getDrinks=await dbConnection.query('SELECT * FROM drinks')
        res.send(getDrinks[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }

 //get by ID_Drink
 const getByIdDrink = async (req,res)=>{
    try{ 
        
        const getDrinks=await dbConnection.query('SELECT * FROM drinks WHERE id=?',[req.params.id])
        res.send(getDrinks[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }
 
 module.exports = { createDrink,getDrink,deleteDrink,updateDrink,getByIdDrink };