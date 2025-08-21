const express = require("express");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");

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

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }

  const query =
    "INSERT INTO app_users (username, email, pass) VALUES (?, ?, ?)";
  db.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error inserting data to the database!" });
    }
    res.json({ message: "Sign Up Succesfull!", userId: results.insertId });
  });
});

app.listen(3000, () => console.log("Server live at port 3000"));
