import React, { useState, useEffect } from "react";
import Header from "./Header";
import Post from "./Post";

const MainContent = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", data.error);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  });

  const handlePost = async (e) => {
    e.preventDefault();

    const uuid = localStorage.getItem("uuid");

    if (!uuid) {
      alert("you must be logged in to post!");
      return;
    }

    const newPost = {
      content: postContent,
      uuid: uuid
    };

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Post added successfully:", data);
      setPosts((prevPosts) => {
        const updated = [...prevPosts, data];
        console.log("Updated posts array:", updated);
        return updated;
      });
      setPostContent("");
    } else {
      console.error("Failed to add post:", data.error);
    }
  };

  return (
    <div>
      <Header />
      <form className="statusBar" onSubmit={handlePost}>
        <input
          type="text"
          required
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button className="buttonStyle" type="submit">
          POST
        </button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
