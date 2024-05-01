import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaHeart } from 'react-icons/fa';
import { getCurrentUserId } from "../utils/decodeData";
import './Post.css';

function PostCard({ item, icon }) {
    const userId = getCurrentUserId();
    const likeStatusKey = `liked_${userId}_post_${item.post_id}`;
    const [likesCount, setLikesCount] = useState(item.num_likes);
    
    // Fetch the initial like state from local storage or default to false if not set
    const [isLiked, setIsLiked] = useState(
        () => JSON.parse(localStorage.getItem(likeStatusKey)) || false
    );

    // Ensure the like status is updated in local storage whenever it changes
    useEffect(() => {
        localStorage.setItem(likeStatusKey, JSON.stringify(isLiked));
    }, [isLiked, likeStatusKey]);

    const handleLike = async () => {
        const method = isLiked ? "DELETE" : "POST";
        const endpoint = "/likes";
        const body = JSON.stringify({ user_id: userId, post_id: item.post_id });

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: body,
            });

            if (response.ok) {
                const newIsLiked = !isLiked;
                setIsLiked(newIsLiked);
                setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
            } else {
                throw new Error("Failed to update like");
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
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

export default PostCard;