const express = require("express")
const dbConnection = require("../database");

//post Stage
const createStage = async (req,res)=>{

    try{ 
        const { start_date, time_show, band } = req.body;
        const newStage_show = [
            start_date, 
            time_show, 
            band 
        ];

       await dbConnection.query(
            'INSERT INTO stage_show ( start_date, time_show, band ) VALUES (?, ?, ?)',
            newStage_show,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

//update Stage
 const updateStage = async (req,res)=>{

    try{ 
        const { start_date, time_show, band } = req.body;
        const newStage_show = [
            start_date, 
            time_show, 
            band,
            req.params.id
        ];

       await dbConnection.query(
            'UPDATE stage_show SET start_date = ? , time_show = ? , band = ? WHERE id = ?',
            newStage_show,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //delete Stage
 const deleteStage = async (req,res)=>{

    try{ 
        const newStage_show = [
            req.params.id
        ];

       await dbConnection.query(
            'DELETE FROM stage_show WHERE id=?',
            newFood,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //get Stage
 const getStage = async (req,res)=>{

    try{ 
        const getStage=await dbConnection.query('SELECT * FROM stage_show')
        res.send(getStage[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }

 //get by ID_Stage
 const getByIdStage = async (req,res)=>{
    try{ 
        
        const getStage=await dbConnection.query('SELECT * FROM stage_show WHERE id=?',[req.params.id])
        res.send(getStage[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }
 
 module.exports = { createStage,getStage,deleteStage,updateStage,getByIdStage };