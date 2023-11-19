const dbConnection = require('../database')

//JOIN food_types ON foods.foods_types=foods_types.name
const createFoodTypes = async (req,res)=>{
    try{ 
        const {  name } = req.body;
        const newUser = [
            name,
            price,
        ];
       await dbConnection.query(
            'INSERT INTO foods ( name) VALUES (?)',
            newUser,
        )
        res.status(200).json({ message: 'successful' });
        
     }catch(error){
         console.log(error)
         res.status(500).json({ message: "Error" });
     }
 }


 module.exports = {createFoodTypes};