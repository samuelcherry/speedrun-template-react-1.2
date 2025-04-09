// controllers/postsController.js
import pool from "../db/pool.js";

export const createPost = async (req, res) => {
  const { content, uuid } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO posts (content, uuid) VALUES ($1, $2) RETURNING id, content, uuid",
      [content, uuid]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: "Failed to add post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.id, posts.content, users.display_name
      FROM posts
      JOIN users ON posts.uuid = users.id;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      return res.json({
        message: "Post deleted successfully",
        post: result.rows[0]
      });
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Failed to delete post" });
  }
};
