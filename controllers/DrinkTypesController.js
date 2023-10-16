const dbConnection = require('../database')

//JOIN drinks_types ON drinks.drinks_types=drinks_types.name
const createDrinkTypes = async (req,res)=>{
    try{ 
        const {  name } = req.body;
        const newUser = [
            
            name,
            price,
        ];
       await dbConnection.query(
            'INSERT INTO drinks ( name) VALUES (?)',
            newUser,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }


 module.exports = {createDrinkTypes};