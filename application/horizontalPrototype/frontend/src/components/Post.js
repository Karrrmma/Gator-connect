import React, { useEffect, useState } from "react";
import {
  FaCommentDots,
  FaHeart,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
import TestPFP from "../assets/images/placeholder_pfp.png";
import Logo from "../assets/images/gator.png";
import Cat from "../assets/images/art5.jpg";
import Dog from "../assets/images/art10.jpg";
import SearchBar from "./SearchBar";
import "./Post.css";
import { getCurrentUserId } from "../utils/decodeData";
import { useNavigate } from 'react-router-dom';

// import {Link} from 'react-router-dom';
// import App from './../App';

function PostCard({ item, icon }) {
  const [likesCount, setLikesCount] = useState(item.likes || 0);
  const userId = getCurrentUserId();
  const navigate = useNavigate();
  const likeStatusKey = `liked_${userId}_post_${item.post_id}`;

  const [isLiked, setIsLiked] = useState(
    () => JSON.parse(localStorage.getItem(likeStatusKey)) || false
  );

  // Update whenever the like status changes
  useEffect(() => {
    localStorage.setItem(likeStatusKey, JSON.stringify(isLiked));
  }, [isLiked, likeStatusKey]);

  const handleLike = async () => {
    const method = isLiked ? "DELETE" : "POST";
    const endpoint = "/likes";
    const body = JSON.stringify({
      user_id: userId,
      post_id: item.post_id,
    });

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        // Optimistically update the likes count
        setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        // Update the like status in localStorage
        localStorage.setItem(likeStatusKey, JSON.stringify(!isLiked));
      } else {
        throw new Error("Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const navigateToProfile = () => {
    // Debugging line to see what you're about to navigate to post.user_id ( Receiver )
    // Check post.user_id
    if (item.user_id) {
    console.log("Post's User ID for navigation (destination's id aka receiver):", item.user_id); 
      navigate(`/profile/${item.user_id}`);
    } else {
      console.error("User ID is undefined, cannot navigate");
    }
  };

  // Check user_id
  console.log("Current User Id(requester) :", userId); // Correct to get userId ( Requester)

  return (
    <div className="card post-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="user-info">
            {/* <img src={avatar} className="rounded-circle" alt="User profile" /> */}
            <div className="avatar" style={{  cursor: 'pointer', transition: 'transform 1s ease', boxShadow: '0.3s ease'}}
            onClick={(e) => {e.stopPropagation(); navigateToProfile();}}>{icon}
            </div>
            <div className="title-container">
              <h5 className="card-title" style={{  cursor: 'pointer', transition: 'transform 1s ease', boxShadow: '0.3s ease'}}
              onClick={(e) => {e.stopPropagation(); navigateToProfile();}}>
                {item.username}
              </h5>
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
                user_id: post.user_id,
                username: post.full_name,
                content: post.post_content,
                timestamp: new Date(post.post_time).toLocaleString(),
                comments: post.num_comments || 0,
                likes: post.num_likes || 0,
                imageUrl: post.imageUrl,
                post_id: post.post_id,
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
