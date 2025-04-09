// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use(authRoutes);
app.use(postsRoutes);

app.listen(PORT, () => console.log("Server running on port 3001"));
