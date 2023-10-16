const dbConnection = require("../database");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { fullname, email, name, password } = req.body;
  console.log("body", req.body);

  try {
    if (!name || !password || !email || !fullname) {
      return res.json({
        message: "Cannot register with empty",
        register: false,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        fullname,
        email,
        name,
        password: hashedPassword,
      };

      await dbConnection.query(
        "INSERT INTO users (fullname, email, name, password) VALUES (?, ?, ?, ?)",
        [newUser.fullname, newUser.email, newUser.name, newUser.password],
        (err, results) => {
          if (err) {
            console.error("Registration error: " + err.sqlMessage);
            res.status(500).json({ message: "Registration failed" });
          } else {
            res.status(200).json({ message: "Registration successful" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot register", register: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log('users',users[0]);
    if (users[0]) {   
        //TODO : check login role 
    (bcrypt.compare(password,users[0][0].password,(err,result)=>{
        if (result) {
            res.status(200).json({ message:users[0][0] });
          } else {
            res.status(500).json({ message: "Cannot failed", login: false });
          }
    }))
      
    } else {
      res.status(500).json({ message: "Cannot login", login: false });
    }
  } catch (error) {}
};

const users = async (req, res) => {
  try {
    const users = await dbConnection.query("SELECT * FROM users");
    // res.json(users)
    res.send(users[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { register, users, login };
