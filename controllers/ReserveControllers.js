const express = require("express")
const dbConnection = require("../database");


//post Reserve
const createReserve = async (req,res)=>{

    try{ 
        const { reserve_date, reserve_name, phone_number, email, number_table, special_need  } = req.body;
        const newReserve = [
            reserve_date, 
            reserve_name, 
            phone_number, 
            email, 
            number_table, 
            special_need
        ];

       await dbConnection.query(
            'INSERT INTO reserve_tables ( reserve_date, reserve_name, phone_number, email, number_table, special_needs) VALUES (?, ?, ?, ?, ?, ?)',
            newReserve,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //update Reserve
 const updateReserve = async (req,res)=>{

    try{ 
        const { reserve_date, reserve_name, phone_number, email, number_table, special_need} = req.body;
        const newReserve = [
            reserve_date, 
            reserve_name, 
            phone_number, 
            email, 
            number_table, 
            special_need,
            req.params.id
        ];

       await dbConnection.query(
            'UPDATE reserve_tables SET reserve_date = ? , reserve_name = ? , phone_number = ? , email = ? , number_table = ? , special_need = ? WHERE id = ?',
            newReserve,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }

 //delete Reserve
 async function deleteReserve(req, res) {

    try {
        const newReserve = [
            req.params.id
        ];

        await dbConnection.query(
            'DELETE FROM reserve_tables WHERE id=?',
            newReserve
        );
        res.status(200).json({ message: 'successful' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}

 //get Reaerve
 const getReserve = async (req,res)=>{

    try{ 
        const getReserve=await dbConnection.query('SELECT * FROM reserve_tables')
        res.send(getReserve[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }

 //get by ID_Reserve
 const getByIdReserve = async (req,res)=>{
    try{ 
        
        const getReserve=await dbConnection.query('SELECT * FROM reserve_tables WHERE id=?',[req.params.id])
        res.send(getReserve[0])
        }catch(error){
            console.log(error)
            res.status(500).json({ message: "Error" });
        }
 }
 
 module.exports = { createReserve,updateReserve,deleteReserve,getReserve,getByIdReserve };









