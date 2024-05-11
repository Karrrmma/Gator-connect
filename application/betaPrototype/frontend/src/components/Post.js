import React, { useEffect, useState } from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "./Post.css";
import { getCurrentUserId } from "../utils/decodeData";
import { useNavigate } from "react-router-dom";
import NewPostPopup from '../pages/Profile/NewPostPopup';


// import {Link} from 'react-router-dom';
// import App from './../App';

function PostCard({ item, icon }) {
  // clear the localStorage ... manually?? 5MB LIMIT
  // localStorage.clear();
  const [likesCount, setLikesCount] = useState(item.likes || 0);
  const [commentsCount, setCommentsCount] = useState(item.comments || 0);
  const [commentsData, setCommentsData] = useState([]);
  const [commentText, setCommentText] = useState("");
  const userId = getCurrentUserId();
  const navigate = useNavigate();

  const likeStatusKey = `liked_${userId}_post_${item.post_id}`;
  const [isLiked, setIsLiked] = useState(() => JSON.parse(localStorage.getItem(likeStatusKey)) || false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    localStorage.setItem(likeStatusKey, JSON.stringify(isLiked));
  }, [isLiked, likeStatusKey]);

  useEffect(() => {
    fetchComments(item.post_id);
  }, [item.post_id]);

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`/api/comments/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setCommentsData(data);
      setCommentsCount(data.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    const method = isLiked ? "DELETE" : "POST";
    const endpoint = "/api/likes";
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
        setLikesCount((prevCount) => isLiked ? prevCount - 1 : prevCount + 1);
      } else {
        throw new Error("Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const endpoint = "/api/comments";
    const body = JSON.stringify({
      user_id: userId,
      post_id: item.post_id,
      comment_content: commentText,
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (response.ok) {
        const newComment = await response.json();
        setCommentsCount((prevCount) => prevCount + 1);
        setCommentText("");
        setCommentsData((prevData) => [newComment, ...prevData]);
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const endpoint = `/api/comments/${commentId}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: item.post_id }),
      });

      if (response.ok) {
        setCommentsCount((prevCount) => prevCount - 1);
        setCommentsData((prevData) =>
          prevData.filter((comment) => comment.comment_id !== commentId)
        );
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const navigatePostUserProfile = () => {
    if (item.user_id) {
      console.log("Post's User ID for navigation (destination's id aka receiver):", item.user_id);
      navigate(`/profile/${item.user_id}`);
    } else {
      console.error("User ID is undefined, cannot navigate");
    }
  };

  const navigateCommentUserProfile = (userId) => {
    if (userId) {
        navigate(`/profile/${userId}`);
    } else {
        console.error("User ID is undefined, cannot navigate");
    }
};


  return (
    <div className="card post-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="user-info">
            {/* <img src={avatar} className="rounded-circle" alt="User profile" /> */}
            <div
              className="avatar"
              onClick={(e) => {
                e.stopPropagation();
                navigatePostUserProfile();
              }}
            >
              {icon}
            </div>
            <div className="title-container">
              <h5
                className="card-title"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePostUserProfile();
                }}
              >
                {item.username}
              </h5>
              <p className="timestamp" style={{ color: 'gray', fontSize: '12px' }}>{item.timestamp}</p>
            </div>
          </div>
          <div
            className="actions d-flex align-items-center"
            style={{ fontSize: "1.2rem" }}
          >
            {/* <button type="button" className="btn btn-outline-secondary btn-sm"><FaCommentDots /></button>
                        <span className="comments-count">{item.comments || 0}</span> */}
            <span className="comments-count">
              {/* need to get total item_comments */}
              <FaCommentDots /> {commentsCount}
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
          {/* need to implement comment */}
          <input
            type="text"
            className="form-control comment-input"
            placeholder="Leave a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          {/* */}
          <button type="button" onClick={handleLike}>
            <FaHeart /> {isLiked ? "Unlike" : "Like"}
          </button>
        </div>
        <div className="comment-section mt-2">
          {commentsData.length > 0 ? (
            <>
              {commentsData.slice(0, showAllComments ? commentsData.length : 3).map((comment) => (
                <div key={comment.comment_id}>
                  {/* <p className="comment-content"> 
                {comment.full_name}   <br></br>
                {comment.comment_content} <br></br>
                {new Date(comment.comment_time).toLocaleString('en-US')}
                </p> */}

                  <div className="comment">
                    <h4 className="comment-user"             
                      onClick={(e) => {
                      e.stopPropagation();
                     navigateCommentUserProfile(comment.user_id);
                      }}>{comment.full_name}</h4>
                    <p className="comment-date">{new Date(comment.comment_time).toLocaleString('en-US')}</p>
                  </div>

                  <div className="comment">
                    <p className="comment-content" style={{ width: '77%' }}>{comment.comment_content}</p>
                    {comment.user_id === userId && (
                      <button onClick={() => handleDeleteComment(comment.comment_id)} style={{ marginBottom: 'auto', backgroundColor: '#1c1c1c', color: 'gray', border: 'none', borderRadius: '4px' }}>delete your comment</button>
                    )}
                  </div>

                </div>
              ))}
              {commentsData.length > 3 && (
                <button onClick={() => setShowAllComments(!showAllComments)} style={{ border: 'none', backgroundColor: 'transparent', color: '#007bff', cursor: 'pointer' }}>Show {showAllComments ? 'less' : 'more'} comments</button>
              )}
            </>
          ) : (
            <p style={{ fontSize: '15px', marginTop: '10px' }}>No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

function UserCard({ username, major, icon, userId }) {

  const navigate = useNavigate();

  const navigateToUserProfile = () => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div className="card" style={{ marginBottom: "30px" }}>
      <div className="card-body">
        <div className="d-flex justify-content-start align-items-center mb-2">
          {/* <img src={TestPFP} className="rounded-circle" alt="placeholder pfp" style={{ width: 40, height: 40 }}></img> */}
          {/* <div className="avatar">🐊</div> */}
          {/* <div className="avatar">{icon}</div> */}
          <div className="text-left">
            <h5 className="card-title ml-2 mb-0" onClick={navigateToUserProfile} >{username}</h5>
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
  const[showNewPost, setShowNewPost] = useState(false);
  useEffect(() => {
    fetchAllPosts(); // This should only fetch all posts, not interfere with search
  }, []); // Empty dependency array ensures this only runs once on mount

  const userId = getCurrentUserId();
  const handleNewPostClick = () => {
    setShowNewPost(!showNewPost);
  };

  // Callback to add new post to the state
  const addNewPost = (newPost) => {
    setItems(prevItems => [newPost, ...prevItems]);
    console.log(newPost);
  };

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
      <button className="pbutton" onClick={()=> setShowNewPost(true)}> CLICK HERE TO ADD A NEW POST</button>
      {showNewPost && <NewPostPopup userId={userId}onClose={handleNewPostClick} onAddPost={addNewPost}/>}
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
                    userId={item.user_id}
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
                timestamp: new Date(post.post_time).toLocaleString('en-US'),
                comments: post.num_comments || 0,
                likes: post.num_likes || 0,
                imageUrl: post.imageUrl,
                post_id: post.post_id,
              }}
              icon={post.avatar}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Post;