import express from "express";
import cors from "cors";
import pool from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para obtener usuarios
app.get("/users", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
});

// Endpoint para crear un usuario
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  res.status(201).json({ id: result.insertId, name, email });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
