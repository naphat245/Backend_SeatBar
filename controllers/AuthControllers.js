const dbConnection = require("../database");
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    const { fullname, email, name, password } = req.body;
    console.log('body', req.body);
    
    try {
        if (!name || !password || !email || !fullname) {
            return res.json({ message: "Cannot register with empty", register: false });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                fullname,
                email,
                name,
                password: hashedPassword,
            };

            dbConnection.query(
                'INSERT INTO users (fullname, email, name, password) VALUES (?, ?, ?, ?)',
                [newUser.fullname, newUser.email, newUser.name, newUser.password],
                (err, results) => {
                    if (err) {
                        console.error('Registration error: ' + err.sqlMessage);
                        res.status(500).json({ message: 'Registration failed' });
                    } else {
                        res.status(200).json({ message: 'Registration successful' });
                    }
                }
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot register", register: false });
    }
};

const users = async (req,res)=>{
   try{ 
    dbConnection.query('SELECT id, name, email,fullname FROM users', (err, results) => {
        if (err) {
          console.error('Error fetching users: ' + err);
          res.status(500).json({ message: 'Failed to retrieve users' });
        } else {
          res.status(200).json({ users: results });
        }
      });}
      catch(err){
        console.log(err)
        res.status(500).json({ message: "Error" });
    }
}

module.exports = { register,users };
