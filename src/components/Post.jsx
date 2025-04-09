import React from "react";
import { IoTrash } from "react-icons/io5";

const Post = ({ post }) => {
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Post deleted:", data.message);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="postContainer">
      <div className="postUser">
        <div>{post.display_name}</div>
      </div>
      <div className="postContent">
        <div>{post.content}</div>
        <div className="postIcons">
          <button className="icon" onClick={() => handleDelete(post.id)}>
            <IoTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
