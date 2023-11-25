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

 // get by Type_Food
const getFoodByType = async (req, res) => {
    try {
      const getFoods = await dbConnection.query(
        "SELECT name, foods_types, price FROM foods WHERE foods_types = (SELECT name FROM foods_types WHERE name = ?)",
        [req.params.name]
      );
  
      console.log('getFoods:', getFoods); // Log the results for debugging
  
      if (getFoods[0].length === 0) {
        res.status(404).json({ message: "Food type not found" });
      } else {
        res.send(getFoods[0]);
      }
    } catch (error) {
      console.error('Error in getFoodByType:', error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
};


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