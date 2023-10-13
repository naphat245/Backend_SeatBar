const dbConnection = require("../database");
const bcrypt = require('bcrypt');
const  register = async (req, res, next) => {
    const { fullname, email,name,password } = req.body;
    console.log('body',req.body);
    try {
        if (!name || !password || !email || !fullname ) {
            return res.json({ message: "Cannot register with empty", register: false })
            
        } else {
            const user = dbConnection.users.find(item => item.name == name || item.email == email)
            console.log(user)

            if (name) {
                return res.json({ message: "Already has name or email", register: false })
            }
            else {
                let id = (dbConnection.users.length) ? dbConnection.users[dbConnection.users.length - 1].id + 1 : 1
                const hash = await bcrypt.hash(password, 10)

                dbConnection.users.push({  name, password: hash, email, fullname })
                console.log(dbConnection.users)
                return res.json({ message: "Register success", data: dbConnection.users, register: true })

            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot register", register: false })
    }
};

module.exports ={ register};