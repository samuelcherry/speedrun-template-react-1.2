// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const SECRET = process.env.JWT_SECRET || "devsecret";

export const register = async (req, res) => {
  const { email, password, displayName } = req.body;
  console.log("Incoming registration:", { email, password, displayName });

  if (!email || !password || !displayName) {
    console.log("Missing field(s)");
    return res.status(400).json({ error: "All fields are required" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name",
      [email, hash, displayName]
    );
    console.log("User created:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(400)
      .json({ error: "Email may already be taken or database error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email
  ]);

  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d"
  });
  res.json({ token, displayName: user.display_name, uuid: user.id });
};

export const getMe = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    const result = await pool.query(
      "SELECT id, email, display_name FROM users WHERE id = $1",
      [decoded.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
