// routes/postsRoutes.js
import express from "express";
import {
  createPost,
  getPosts,
  deletePost
} from "../controllers/postsController.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.delete("/posts/:id", deletePost);

export default router;
