/**
 * PostCard.js
 * - Reused Post Card component for displaying posts on both the home page and 
 *   the profile page.
 * - The post card works independently where it will check and handle its own likes 
 *   and comments.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaHeart } from 'react-icons/fa';
import { getCurrentUserId } from '../utils/decodeData';
import {
  addComment,
  deleteComment,
  getComments,
  postHandleLike,
  getIsPostLiked,
} from '../services/Post/PostService';

function PostCard({ item, icon }) {
  const [likesCount, setLikesCount] = useState(item.likes || 0);
  const [commentsCount, setCommentsCount] = useState(item.comments || 0);
  const [commentsData, setCommentsData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const userId = getCurrentUserId();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  // check if a post is liked, then set the like status
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const test = await getIsPostLiked(userId, item.post_id);
        setIsLiked(test.isLiked);
        return test.isLiked;
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
      return false;
    };
    fetchLikeStatus();
  }, [item]);

  // grab a post's comments
  useEffect(() => {
    fetchComments(item.post_id);
  }, [item.post_id]);

  const fetchComments = async (postId) => {
    try {
      const data = await getComments(postId);
      setCommentsData(data);
      setCommentsCount(data.length);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // like/unlike a post
  const handleLike = async () => {
    const method = isLiked ? 'DELETE' : 'POST';
    const body = {
      user_id: userId,
      post_id: item.post_id,
    };
    try {
      await postHandleLike(method, body);
      setIsLiked(!isLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

      if (isLiked) {
        setLikedPosts(
          likedPosts.map((post) =>
            post.post_id === item.post_id ? { ...post, liked: false } : post
          )
        );
      } else {
        setLikedPosts([...likedPosts, { post_id: item.post_id, liked: true }]);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const body = {
      user_id: userId,
      post_id: item.post_id,
      comment_content: commentText,
    };

    try {
      const newComment = await addComment(body);

      setCommentsCount((prevCount) => prevCount + 1);
      setCommentText('');
      setCommentsData((prevData) => [newComment, ...prevData]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, { post_id: item.post_id });

      setCommentsCount((prevCount) => prevCount - 1);
      setCommentsData((prevData) =>
        prevData.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const navigatePostUserProfile = () => {
    if (item.user_id) {
      console.log(
        "Post's User ID for navigation (destination's id aka receiver):",
        item.user_id
      );
      navigate(`/profile/${item.user_id}`);
    } else {
      console.error('User ID is undefined, cannot navigate');
    }
  };

  const navigateCommentUserProfile = (userId) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error('User ID is undefined, cannot navigate');
    }
  };

  return (
    <div className="card post-card">
      <div className="card-body w-100">
        <div className="d-flex justify-content-between align-items-start">
          <div className="user-info">
            {/* <img src={avatar} className="rounded-circle" alt="User profile" /> */}
            <div
              className="avatar-post"
              onClick={(e) => {
                e.stopPropagation();
                navigatePostUserProfile();
              }}
            >
              {icon}
            </div>
            <div className="title-container">
              <h5
                className="card-title capitalize"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePostUserProfile();
                }}
              >
                {item.username}
              </h5>
              <p
                className="timestamp"
                style={{ color: 'gray', fontSize: '12px' }}
              >
                {item.timestamp}
              </p>
            </div>
          </div>
          <div
            className="actions d-flex align-items-center"
            style={{ fontSize: '1.2rem' }}
          >
            {/* <button type="button" className="btn btn-outline-secondary btn-sm"><FaCommentDots /></button>
                        <span className="comments-count">{item.comments || 0}</span> */}
            <span className="comments-count">
              {/* total item_comments */}
              <FaCommentDots /> {commentsCount}
            </span>
            <span className={`outline-success ${isLiked ? 'red-heart' : ''}`}>
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
            style={{ maxWidth: '80%' }}
          />
        )}
        <div className="comment-input-section">
          {/* comment */}
          <input
            type="text"
            className="form-control comment-input"
            placeholder="Leave a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          {/* */}
          <button type="button" onClick={handleLike}>
            <FaHeart /> {isLiked ? 'Unlike' : 'Like'}
          </button>
        </div>
        <div className="comment-section mt-2">
          {commentsData.length > 0 ? (
            <>
              {commentsData
                .slice(0, showAllComments ? commentsData.length : 3)
                .map((comment) => (
                  <div key={comment.comment_id}>
                    <div className="comment">
                      <h4
                        className="comment-user capitalize"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateCommentUserProfile(comment.user_id);
                        }}
                      >
                        {comment.full_name}
                      </h4>
                      <p className="comment-date">
                        {new Date(comment.comment_time).toLocaleString('en-US')}
                      </p>
                    </div>
                    <div className="comment">
                      <p className="comment-content" style={{ width: '77%' }}>
                        {comment.comment_content}
                      </p>
                      {comment.user_id === userId && (
                        <button
                          onClick={() =>
                            handleDeleteComment(comment.comment_id)
                          }
                          style={{
                            marginBottom: 'auto',
                            backgroundColor: '#1c1c1c',
                            color: 'gray',
                            border: 'none',
                            borderRadius: '4px',
                          }}
                        >
                          delete your comment
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              {commentsData.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#007bff',
                    cursor: 'pointer',
                  }}
                >
                  Show {showAllComments ? 'less' : 'more'} comments
                </button>
              )}
            </>
          ) : (
            <p style={{ fontSize: '15px', marginTop: '10px' }}>
              No comments yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
