const express = require("express")
const dbConnection = require("../database");

//post Promotion
const createFood = async (req,res)=>{

    try{ 
        const { file_name, title, description, start_date, uploaded_on, status } = req.body;
        const newPromotion = [
            file_name, 
            title, 
            description, 
            start_date,
            uploaded_on, 
            status
        ];

       await dbConnection.query(
            'INSERT INTO promotion ( file_name, title, description, start_date, uploaded_on, status ) VALUES (?, ?, ?, ?, ?, ?)',
            newPromotion,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

//update Promotion
 const updatePromotion = async (req,res)=>{

    try{ 
        const { file_name, title, description, start_date, uploaded_on, status } = req.body;
        const newPromotion = [
            file_name, 
            title, 
            description, 
            start_date, 
            uploaded_on, 
            status,
            req.params.id
        ];

       await dbConnection.query(
            'UPDATE promotion SET file_name = ? , title = ? , description = ?, start_date = ?, uploaded_on = ?, status = ?WHERE id = ?',
            newPromotion,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //delete Promotion
 const deletePromotion = async (req,res)=>{

    try{ 
        const newPromotion = [
            req.params.id
        ];

       await dbConnection.query(
            'DELETE FROM promotion WHERE id=?',
            newFood,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //get Promotion
 const getPromotion = async (req,res)=>{

    try{ 
        const getPromotion=await dbConnection.query('SELECT * FROM promotion')
        res.send(getPromotion[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }

 //get by ID_Promotion
 const getByIdPromotion = async (req,res)=>{
    try{ 
        
        const getPromotion=await dbConnection.query('SELECT * FROM promotion WHERE id=?',[req.params.id])
        res.send(getPromotion[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }
 
 module.exports = { createPromotion,getPromotion,deletePromotion,updatePromotion,getByIdPromotion };