const express = require("express");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api-integration",
});

db.connect((err) => {
  if (err) {
    console.error("Error, not connected to the database!:", err);
  } else {
    console.log("Connected to the database!");
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }

  const checkQuery = "SELECT * FROM app_users WHERE email = ? OR username = ?";
  db.query(checkQuery, [email, username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery =
      "INSERT INTO app_users (username, email, pass) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, email, hashedPassword], (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error inserting data into database" });
      }
      res.json({ message: "Sign Up Successful!", userId: results.insertId });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "All fields are mandatory!" });

  const query = "SELECT * FROM app_users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) {
    return res.status(401).json({ error: "Invalid username or password!" });
  }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.pass);

    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid username or password!" });

    res.json({ message: "Login successful", userId: user.id });
  });
});

app.listen(3000, () => console.log("Server live at port 3000"));
