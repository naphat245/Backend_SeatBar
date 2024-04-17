const dbConnection = require("../database");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password, node } = req.body;

  try {
    if (!username || !email || !password || !node ) {
      return res.status(400).json({
        message: "Cannot register with empty fields",
        register: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: username,
      email,
      node: node,
      password: hashedPassword,
      
    };

    const query = "INSERT INTO users (username, email, password, node) VALUES (?, ?, ?, ?)";
    const values = [newUser.username, newUser.email, newUser.password, newUser.node];

    await dbConnection.query(query, values);

    res.status(200).json({ message: "Registration successful", register: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", register: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await dbConnection.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users[0]) {
      const user = users[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Check the user's role and respond accordingly
        if (user.status_user === 0) {
          res.status(200).json({ message: "Admin login successful", user ,status_code: "Admin"});
        } 
      } else {
        res.status(401).json({ message: "Invalid password", login: false });
      }
    } else {
      res.status(404).json({ message: "User not found", login: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", login: false });
  }
};

const users = async (req, res) => {
  try {
    const [users] = await dbConnection.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { register, users, login };
