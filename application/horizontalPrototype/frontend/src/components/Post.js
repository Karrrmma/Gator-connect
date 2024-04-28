import React, { useEffect, useState } from "react";
import {FaCommentDots,FaHeart,FaRegThumbsUp,FaRegThumbsDown,} from "react-icons/fa";
import TestPFP from "../assets/images/placeholder_pfp.png";
import Logo from "../assets/images/gator.png";
import Cat from "../assets/images/art5.jpg";
import Dog from "../assets/images/art10.jpg";
import SearchBar from "./SearchBar";
import "./Post.css";

// import {Link} from 'react-router-dom';
// import App from './../App';
function PostCard({ item, icon }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes || 0);
  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
    setIsLiked(!isLiked);
  };
  return (
    <div className="card post-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="user-info">
            {/* <img src={avatar} className="rounded-circle" alt="User profile" /> */}
            <div className="avatar">{icon}</div>
            <div className="title-container">
              <h5 className="card-title">{item.username}</h5>
              <p className="timestamp">{item.timestamp}</p>
            </div>
          </div>
          <div
            className="actions d-flex align-items-center"
            style={{ fontSize: "1.2rem" }}
          >
            {/* <button type="button" className="btn btn-outline-secondary btn-sm"><FaCommentDots /></button>
                        <span className="comments-count">{item.comments || 0}</span> */}
            <span className="comments-count">
              <FaCommentDots /> {item.comments || 0}
            </span>
            <span className={`outline-success ${isLiked ? "red-heart" : ""}`}>
              <FaHeart /> {likesCount}
            </span>
          </div>
        </div>

        <p className="card-text">{item.content}</p>
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            className="card-image mt-2 mb-3"
            alt="Post"
            style={{ maxWidth: "80%" }}
          />
        )}

        <div className="comment-input-section">
          <input
            type="text"
            className="form-control comment-input"
            placeholder="Leave a comment..."
          />
          <button type="button" onClick={handleLike}>
            <FaHeart /> {isLiked ? "Unlike" : "Like"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserCard({ username, major, icon }) {
  return (
    <div className="card" style={{ marginBottom: "30px" }}>
      <div className="card-body">
        <div className="d-flex justify-content-start align-items-center mb-2">
          {/* <img src={TestPFP} className="rounded-circle" alt="placeholder pfp" style={{ width: 40, height: 40 }}></img> */}
          {/* <div className="avatar">🐊</div> */}
          {/* <div className="avatar">{icon}</div> */}
          <div className="text-left">
            <h5 className="card-title ml-2 mb-0">{username}</h5>
            <div className="text-muted small ml-2 mt-0 major">{major}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Post() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [noUsersFound, setNoUsersFound] = useState(false);

  useEffect(() => {
    fetchAllPosts(); // This should only fetch all posts, not interfere with search
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    if (Object.keys(searchQuery).length > 0) {
      // Only run this if there's a valid search query
      fetchItems(searchQuery);
    }
  }, [searchQuery]);

  async function fetchAllPosts() {
    try {
      const response = await fetch("/posts");
      const data = await response.json();
      if (response.ok) {
        setItems(data);
      } else {
        console.error("Failed to fetch posts:", data.message);
        setItems([]); // Reset the posts on failure
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function fetchItems({ username, major, year }) {
    let url = "/search";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, major, year }),
    };
    if (!username && !major && !year) {
      url = "/testpost";
      options = {};
    }

    const response = await fetch(url, options);
    const newItems = await response.json();

    if (!newItems.results || newItems.results.length === 0) {
      setNoUsersFound(true);
    } else {
      setNoUsersFound(false);
    }

    if (url === "/search") {
      setItems(newItems.results);
    } else {
      setItems(newItems.slice(0, 3));
    }
  }
  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      {Object.values(searchQuery).some((value) => value) ? (
        <>
          {noUsersFound ? <p>No users found.</p> : null}
          <section className="w-50">
            {items.map((item, index) => {
              if (item) {
                return (
                  <UserCard
                    key={index}
                    username={item.username}
                    major={item.major}
                    icon={item.icon}
                  />
                );
              }
              return null;
            })}
          </section>
        </>
      ) : (
        <section className="w-50">
          {items.map((post, index) => (
            <PostCard
              key={index}
              item={{
                username: post.full_name,
                content: post.post_content,
                timestamp: new Date(post.post_time).toLocaleString(),
                comments: post.num_comments || 0,
                likes: post.num_likes || 0,
                imageUrl: post.imageUrl,
              }}
              icon={"🐊"} // You can customize this icon based on your application's needs
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Post;